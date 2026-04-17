#!/usr/bin/env bash
# ============================================================
#  GitSage CLI — Production Install Script
#  Usage:   curl -fsSL https://gitsage-ai.vercel.app/install.sh | bash
#  Override: INSTALL_VERSION=v1.2.0 bash install.sh
# ============================================================
set -euo pipefail

# ── Constants ────────────────────────────────────────────────
REPO="iamAgbaCoder/GitSage"
BINARY_NAME="gitsage"
INSTALL_DIR="/usr/local/bin"
FALLBACK_VERSION="v1.0.0"
GITHUB_API="https://api.github.com/repos/${REPO}/releases/latest"
GITHUB_RELEASES="https://github.com/${REPO}/releases/download"
# https://github.com/iamAgbaCoder/GitSage/releases/download/v1.0.0/gitsage-windows-amd64.exe
# ── Colors ───────────────────────────────────────────────────
RESET="\033[0m"
BLUE="\033[1;34m"
GREEN="\033[1;32m"
RED="\033[1;31m"
YELLOW="\033[1;33m"
BOLD="\033[1m"

info()    { echo -e "${BLUE}[INFO]${RESET}  $*" >&2; }
success() { echo -e "${GREEN}[OK]${RESET}    $*" >&2; }
warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*" >&2; }
error()   { echo -e "${RED}[ERROR]${RESET} $*" >&2; exit 1; }

# ── Dependency check ─────────────────────────────────────────
check_deps() {
  if ! command -v curl &>/dev/null; then
    error "curl is required but not installed. Install it and retry."
  fi
  if ! command -v shasum &>/dev/null && ! command -v sha256sum &>/dev/null; then
    error "shasum or sha256sum is required but not found."
  fi
}

# ── OS + Arch detection ──────────────────────────────────────
detect_platform() {
  local os arch

  case "$(uname -s)" in
    Darwin)  os="darwin" ;;
    Linux)   os="linux"  ;;
    *)       error "Unsupported OS: $(uname -s). GitSage supports macOS and Linux." ;;
  esac

  case "$(uname -m)" in
    x86_64)          arch="amd64" ;;
    arm64|aarch64)   arch="arm64" ;;
    *)               error "Unsupported architecture: $(uname -m)." ;;
  esac

  echo "${os}-${arch}"
}

# ── Version resolution ───────────────────────────────────────
resolve_version() {
  # Allow manual override via environment variable
  if [[ -n "${INSTALL_VERSION:-}" ]]; then
    echo "${INSTALL_VERSION}"
    return
  fi

  info "Fetching latest version from GitHub..."
  local version
  version=$(
    curl -fsSL --connect-timeout 10 "${GITHUB_API}" 2>/dev/null \
      | grep '"tag_name"' \
      | sed -E 's/.*"tag_name": *"([^"]+)".*/\1/'
  ) || true

  if [[ -z "${version}" ]]; then
    warn "Could not fetch latest version. Falling back to ${FALLBACK_VERSION}."
    echo "${FALLBACK_VERSION}"
  else
    echo "${version}"
  fi
}

# ── Checksum verification ────────────────────────────────────
verify_checksum() {
  local binary="$1" checksum_file="$2"

  if command -v sha256sum &>/dev/null; then
    sha256sum --check "${checksum_file}" --status \
      || error "Checksum verification FAILED for ${binary}. Aborting installation."
  else
    shasum -a 256 --check "${checksum_file}" --status \
      || error "Checksum verification FAILED for ${binary}. Aborting installation."
  fi
}

# ── Sudo helper ──────────────────────────────────────────────
maybe_sudo() {
  if [[ -w "${INSTALL_DIR}" ]]; then
    "$@"
  elif command -v sudo &>/dev/null; then
    sudo "$@"
  else
    error "Cannot write to ${INSTALL_DIR} and sudo is not available."
  fi
}

# ── Download + verify + install ──────────────────────────────
install_binary() {
  local version="$1" platform="$2"
  local asset="${BINARY_NAME}-${platform}"
  local download_url="${GITHUB_RELEASES}/${version}/${asset}"
  local checksum_url="${download_url}.sha256"
  local tmp_dir
  tmp_dir="$(mktemp -d)"

  # Clean up temp dir on any exit
  trap 'rm -rf "${tmp_dir}"' EXIT

  local tmp_binary="${tmp_dir}/${asset}"
  local tmp_checksum="${tmp_dir}/${asset}.sha256"

  info "Downloading ${asset} (${version})..."
  if ! curl -fsSL --connect-timeout 30 --retry 3 \
       --progress-bar -o "${tmp_binary}" "${download_url}"; then
    error "Failed to download binary from:\n  ${download_url}"
  fi

  info "Downloading checksum..."
  if ! curl -fsSL --connect-timeout 10 --retry 3 \
       -o "${tmp_checksum}" "${checksum_url}"; then
    error "Failed to download checksum from:\n  ${checksum_url}"
  fi

  # Normalize checksum file: sha256sum/shasum expect "hash  filename"
  local hash
  hash="$(awk '{print $1}' "${tmp_checksum}")"
  echo "${hash}  ${asset}" > "${tmp_checksum}"

  # Verify from within the temp dir so the filename matches
  info "Verifying checksum..."
  ( cd "${tmp_dir}" && verify_checksum "${asset}" "${tmp_checksum}" )
  success "Checksum verified."

  info "Installing to ${INSTALL_DIR}/${BINARY_NAME}..."
  chmod +x "${tmp_binary}"
  maybe_sudo cp "${tmp_binary}" "${INSTALL_DIR}/${BINARY_NAME}"
  # trap will clean up tmp_dir
}

# ── Post-install check ───────────────────────────────────────
post_install_check() {
  if command -v "${BINARY_NAME}" &>/dev/null; then
    local installed_version
    installed_version=$("${BINARY_NAME}" --version 2>/dev/null || echo "unknown")
    success "GitSage installed at $(command -v ${BINARY_NAME}) (${installed_version})"
  else
    warn "${INSTALL_DIR} may not be in your PATH."
    warn "Add this line to your shell profile (~/.bashrc, ~/.zshrc, etc.):"
    warn "  export PATH=\"\${PATH}:${INSTALL_DIR}\""
  fi
}

# ── Auto-update ──────────────────────────────────────────────
do_update() {
  local current_version latest_version platform

  platform="$(detect_platform)"

  info "Checking for updates..."
  latest_version="$(resolve_version)"

  if command -v "${BINARY_NAME}" &>/dev/null; then
    current_version=$(
      "${BINARY_NAME}" --version 2>/dev/null \
        | grep -Eo 'v[0-9]+\.[0-9]+\.[0-9]+' \
        || echo "unknown"
    )
  else
    current_version="not installed"
  fi

  info "Installed : ${current_version}"
  info "Latest    : ${latest_version}"

  if [[ "${current_version}" == "${latest_version}" ]]; then
    success "GitSage is already up to date."
    exit 0
  fi

  info "Updating ${current_version} → ${latest_version}..."
  install_binary "${latest_version}" "${platform}"
  post_install_check
  success "Update complete."
}

# ── Main ─────────────────────────────────────────────────────
main() {
  echo -e "${BOLD}"
  echo "  ╔════════════════════════════════════════╗"
  echo "  ║   GitSage CLI — Installer              ║"
  echo "  ║   github.com/iamAgbaCoder/gitsage      ║"
  echo "  ╚════════════════════════════════════════╝"
  echo -e "${RESET}"

  if [[ "${1:-}" == "--update" ]]; then
    do_update
    exit 0
  fi

  check_deps

  local platform version
  platform="$(detect_platform)"
  version="$(resolve_version)"

  info "Platform : ${platform}"
  info "Version  : ${version}"

  install_binary "${version}" "${platform}"
  post_install_check

  echo ""
  echo -e "${GREEN}${BOLD}GitSage is ready.${RESET}"
  echo ""
  echo "  Authenticate:"
  echo "    gitsage auth --token <YOUR_API_KEY>"
  echo ""
  echo "  Generate a commit:"
  echo "    gitsage commit"
  echo ""
  echo "  Docs: https://gitsage-ai.vercel.app/docs"
  echo ""
}

main "$@"
