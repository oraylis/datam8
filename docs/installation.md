# Install DataM8

Choose the **DataM8 app** for visual modeling and generation, or the **DataM8 CLI**
for command-line validation, generation and automation. Use a stable release
compatible with your solution. Read its release notes before upgrading.

## DataM8 app

Open the [current stable app release](https://github.com/oraylis/datam8-frontend/releases/latest)
and download the package for your operating system and processor from **Assets**.
The release page is authoritative for filenames and platform requirements; the
patterns below use `<version>` for the selected release number.

| Platform | Package pattern | Use |
| --- | --- | --- |
| Windows x64 | `DataM8-Setup-<version>.exe` | Run the NSIS installer |
| macOS Apple Silicon | `DataM8-<version>-mac-arm64.dmg` or `.zip` | Copy the application to Applications |
| macOS Intel | `DataM8-<version>-mac-x64.dmg` or `.zip` | Copy the application to Applications |
| Linux x64 | `DataM8-<version>.AppImage` | Make executable and launch |
| Debian/Ubuntu amd64 | `datam8_<version>_amd64.deb` | Install using the distribution's package tools |

The app bundles its generator and Python runtime. Node, Python and uv are only
needed for development or a separate CLI installation. `.blockmap` and `latest.yml`
are update metadata, not applications.

## Verify the download

Download `SHA256SUMS`, `SHA256SUMS.asc` and the public verification key from the
**same release** as the package. Check the signing identity and verify the signed
checksum manifest using the [installation and signature-verification guide](https://github.com/oraylis/datam8-frontend/blob/main/docs/desktop-installation.md#public-signing-identities).
Follow that guide's package-signature checks before installation.

Compare the package's SHA-256 with its entry in the verified manifest. Replace
`<version>` with the selected release number. On Windows:

```powershell
Get-FileHash -Algorithm SHA256 '.\DataM8-Setup-<version>.exe'
```

On Linux use `sha256sum <download>`; on macOS use `shasum -a 256 <download>`.
Check the complete value and filename. A matching checksum alone does not establish
publisher identity; use the signature checks above.

## First launch

1. Install or extract the verified package and launch DataM8.
2. Follow the [guide prerequisites](user-guide/getting-started.md) to obtain a
   complete disposable sample copy.
3. Choose **Open** and select its `.dm8s`; confirm the model tree.
4. Edit a description, check save/reload, then generate `docs` and inspect disk output.

The tutorial images record a specific browser/backend/sample combination; they
are not acceptance evidence for another installed app or sample revision. See
[historical capture and release provenance](compatibility.md).

## DataM8 CLI

Open the [current stable CLI release](https://github.com/oraylis/datam8-cli/releases/latest)
and follow [Install the CLI](https://github.com/oraylis/datam8-cli/blob/main/README.md#install-the-cli)
for wheel installation with uv or pipx and optional connector/API dependencies.
A Git checkout is only needed for development. Select a release compatible with
your solution and templates; the app's bundled generator has its own exact pin.

After installation, see [CLI validation and generation](validator.md).

## Updating solutions

Back up the complete solution before opening it in another version. Read the
selected release's migration and compatibility notes, including plugin layout,
bindings and saved type mappings. Matching version labels alone do not identify
the exact bundled runtime or establish compatibility with custom templates/plugins.
Use the release's build manifest and version-tagged technical references when
checking an existing installation. This guide does not claim automatic migration.
