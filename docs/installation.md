# Install DataM8 Desktop

Use the [v2.0.0-beta.6 release page](https://github.com/oraylis/datam8-frontend/releases/tag/v2.0.0-beta.6)
for the following verified artifact names. This is an artifact-selection guide;
installed operation is not yet accepted by this documentation update. See
[compatibility](compatibility.md) before choosing a sample revision.

| Platform | Published artifact | Use |
| --- | --- | --- |
| Windows | `DataM8.Setup.2.0.0-beta.6.exe` | Run the desktop installer; verify machine architecture against release build metadata |
| macOS Apple Silicon | `DataM8-2.0.0-beta.6-arm64.dmg` | Mount and copy the app to Applications |
| macOS Apple Silicon | `DataM8-2.0.0-beta.6-arm64-mac.zip` | Extract the application bundle |
| Linux | `DataM8-2.0.0-beta.6.AppImage` | Make executable and launch; verify architecture against release metadata |
| Debian/Ubuntu amd64 | `datam8_2.0.0-beta.6_amd64.deb` | Install using the distribution's package tools |

No Intel macOS artifact is listed for this release. `.blockmap`, `latest*.yml` and
builder-debug YAML files are update/build metadata, not applications. Do not infer
signing, notarization or supported OS versions from file availability alone.

## Verify the download

Download `SHA256SUMS.txt` from the **same release** and compare the checksum for
your chosen file. On Windows:

```powershell
Get-FileHash -Algorithm SHA256 '.\DataM8.Setup.2.0.0-beta.6.exe'
```

On Linux use `sha256sum <download>`; on macOS use `shasum -a 256 <download>`.
Compare the complete value with the matching filename in the checksum file.

## First launch

1. Install or extract the selected artifact and launch DataM8.
2. Follow the [guide prerequisites](user-guide/getting-started.md) to obtain a
   complete disposable sample copy.
3. Choose **Open** and select its `.dm8s`; confirm the model tree.
4. Edit a description, check save/reload, then generate `docs` and inspect disk output.

Installed desktop packages bundle their backend runtime. Node, Python and uv are
development prerequisites, not instructions for installing the desktop application.
Browser development has different workspace-selection behavior; follow the guide.

## Updating solutions

Back up the complete solution before opening it in another version. Beta.6 release
notes require `pluginsPath` and the documented connector manifest layout. Confirm
the bundled runtime's contract rather than assuming a development branch's plugin
discovery behavior. This guide does not claim an automatic migration workflow.
