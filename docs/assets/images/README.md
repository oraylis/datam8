# Product Illustration Sources

The product README uses original diagrams from the user-supplied ORAYLIS
presentation `2026_AutomationPitch (EN).pdf`. The diagrams illustrate the automation
concept; they are not screenshots or evidence of tested connector/target support.
The full presentation is not included in this repository.

## Source and extraction

- Source PDF SHA-256: `510728e71adf214b65b226a02e2a231a212a467a46510a1cb9a20117bd96e5a8`.
- Extracted on 2026-10-02 using pypdfium2 5.13.0 and Pillow.
- Source pages measure 1440 × 810 PDF points. Render at scale 2 (144 dpi), then
  crop using the coordinates below. Coordinates are `(left, top, right, bottom)`
  in PDF points, measured from the top-left corner; multiply by 2 for pixel crops.
- Only slide headings, footers and surrounding whitespace were removed. Diagram
  content, labels, colors and aspect ratios were preserved, including "Doku" on
  page 9. The product README provides its English meaning.

| Image | PDF page | Crop in points | PNG dimensions |
| --- | --- | --- | --- |
| [Automation overview](datam8-automation-overview.png) | 6 | `(28, 150, 1430, 708)` | 2804 × 1116 |
| [Generation principle](datam8-generation-principle.png) | 9 | `(12, 150, 1194, 708)` | 2364 × 1116 |

PNG SHA-256 checksums:

- `datam8-automation-overview.png`: `608d0a37c532d37bf9c463af0170bc8a5e24fa6750c162c60bcc01d2923ffbbc`.
- `datam8-generation-principle.png`: `2aa2544eeedd14b2bdaf406e77feba4291b6841f51ca7546e579b5283018df0a`.

## Existing logo

[The DataM8 logo](dm8_incl_text.png) is restored byte-for-byte from this repository
at commit `4002a0ea0ae2f66f56c310da2f569ed5181e7558`, Git blob
`83556b1e31715aa865a7890c65edf44a30c663c4`. It is not an extraction from the PDF.

## Maintenance

Keep these illustrations separate from the [user-guide capture
manifest](../../user-guide/assets/manifest.json). They have different provenance
and do not change the handbook's UI acceptance evidence. When updating an
illustration, update its source, crop, dimensions and checksum here, then inspect
the README at wide and narrow widths. Readers can open the full-resolution PNGs
to inspect small diagram labels.
