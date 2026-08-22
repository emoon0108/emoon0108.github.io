#!/usr/bin/env python3
"""Build the public, recruiter-facing resume and curriculum vitae PDFs.

The generated PDFs deliberately keep personal contact details to professional
channels only. Run with a Python environment that includes ReportLab.
"""

from __future__ import annotations

from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
NAVY = colors.HexColor("#102A43")
BLUE = colors.HexColor("#0B6E99")
INK = colors.HexColor("#17212B")
MUTED = colors.HexColor("#52606D")
RULE = colors.HexColor("#CBD5E1")
PAPER = colors.white


def register_fonts() -> tuple[str, str, str, str]:
    """Use macOS system fonts when present and portable built-ins otherwise."""
    regular = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
    bold = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    italic = Path("/System/Library/Fonts/Supplemental/Arial Italic.ttf")
    bold_italic = Path("/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf")
    if all(path.exists() for path in (regular, bold, italic, bold_italic)):
        pdfmetrics.registerFont(TTFont("CareerSans", str(regular)))
        pdfmetrics.registerFont(TTFont("CareerSans-Bold", str(bold)))
        pdfmetrics.registerFont(TTFont("CareerSans-Italic", str(italic)))
        pdfmetrics.registerFont(TTFont("CareerSans-BoldItalic", str(bold_italic)))
        return "CareerSans", "CareerSans-Bold", "CareerSans-Italic", "CareerSans-BoldItalic"
    return "Helvetica", "Helvetica-Bold", "Helvetica-Oblique", "Helvetica-BoldOblique"


FONT, FONT_BOLD, FONT_ITALIC, FONT_BOLD_ITALIC = register_fonts()


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def safe(text: str) -> str:
    return escape(text, quote=False)


def styles(size: float, leading: float) -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=19,
            leading=20,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=1.5,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=7.7,
            leading=9,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=8.6,
            leading=10,
            textColor=BLUE,
            spaceBefore=4.2,
            spaceAfter=1.5,
            borderWidth=0,
            borderPadding=0,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=size,
            leading=leading,
            textColor=INK,
            spaceAfter=0.7,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=max(size - 0.25, 6.9),
            leading=max(leading - 0.2, 8.4),
            textColor=INK,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=size + 0.15,
            leading=leading,
            textColor=NAVY,
        ),
        "date": ParagraphStyle(
            "Date",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=size - 0.1,
            leading=leading,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "subtle": ParagraphStyle(
            "Subtle",
            parent=base["Normal"],
            fontName=FONT_ITALIC,
            fontSize=size - 0.1,
            leading=leading,
            textColor=MUTED,
            spaceAfter=0.5,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=size,
            leading=leading,
            textColor=INK,
            leftIndent=8.5,
            firstLineIndent=-6.5,
            bulletIndent=0,
            spaceAfter=0.65,
        ),
    }


def section(title: str, st: dict[str, ParagraphStyle]) -> list:
    label = p(safe(title.upper()), st["section"])
    rule = Table([[""]], colWidths=[None], rowHeights=[0.6])
    rule.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BLUE)]))
    return [label, rule, Spacer(1, 1)]


def role_header(
    title: str,
    organization: str,
    date: str,
    st: dict[str, ParagraphStyle],
    location: str | None = None,
) -> Table:
    left = f"{safe(title)} — {safe(organization)}"
    if location:
        left += f" <font name='{FONT}' color='#52606D'>| {safe(location)}</font>"
    table = Table(
        [[p(left, st["role"]), p(safe(date), st["date"])]],
        colWidths=[None, 1.55 * inch],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def bullet(text: str, st: dict[str, ParagraphStyle]) -> Paragraph:
    return p(f"• {safe(text)}", st["bullet"])


def contact_block(st: dict[str, ParagraphStyle]) -> list[Paragraph]:
    return [
        p("Ethan Moon", st["name"]),
        p(
            "616-295-5694  |  ethmoon@umich.edu  |  "
            "<link href='https://www.linkedin.com/in/ethan-moon-b9a2a7314' color='#0B6E99'>linkedin.com/in/ethan-moon-b9a2a7314</link>  |  "
            "<link href='https://github.com/emoon0108' color='#0B6E99'>github.com/emoon0108</link>  |  "
            "<link href='https://emoon0108.github.io' color='#0B6E99'>emoon0108.github.io</link>",
            st["contact"],
        ),
    ]


def configure_metadata(canvas, doc, title: str, subject: str) -> None:
    canvas.saveState()
    canvas.setTitle(title)
    canvas.setAuthor("Ethan Moon")
    canvas.setSubject(subject)
    canvas.setCreator("Ethan Moon portfolio document build")
    canvas.restoreState()


def build_resume() -> None:
    output = PUBLIC / "Ethan_Moon_Resume.pdf"
    st = styles(8.05, 9.8)
    doc = BaseDocTemplate(
        str(output),
        pagesize=LETTER,
        leftMargin=0.43 * inch,
        rightMargin=0.43 * inch,
        topMargin=0.34 * inch,
        bottomMargin=0.32 * inch,
        title="Ethan Moon — Software Engineering Resume",
        author="Ethan Moon",
        subject="Software engineering resume",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume")
    doc.addPageTemplates(
        PageTemplate(
            id="resume",
            frames=[frame],
            onPage=lambda c, d: configure_metadata(
                c, d, "Ethan Moon — Software Engineering Resume", "Software engineering resume"
            ),
        )
    )

    story: list = contact_block(st)
    story += section("Education", st)
    story.append(
        role_header(
            "B.S.E. Computer Science, College of Engineering",
            "University of Michigan",
            "Expected May 2028",
            st,
            "Ann Arbor, MI",
        )
    )
    story.append(
        p(
            "<b>Coursework:</b> Computers &amp; Programming, Discrete Math, Proof-Based Linear Algebra, "
            "Multivariable Calculus, Differential Equations, Statistics, Physics",
            st["small"],
        )
    )

    story += section("Technical Skills", st)
    story.append(
        p(
            "<b>Languages:</b> TypeScript, JavaScript, Python, C++, SQL  |  "
            "<b>Product:</b> React, Next.js, React Native/Expo, Node.js, Hono  |  "
            "<b>Data &amp; Platform:</b> PostgreSQL, Drizzle ORM, OpenAPI/Orval, Docker, Git  |  "
            "<b>Engineering:</b> OpenFOAM, ParaView, NASA GMAT, Arduino, ESP32, computer vision, digital twins  |  "
            "<b>Spoken:</b> English and Korean (native/bilingual), Spanish (limited working)",
            st["body"],
        )
    )

    story += section("Experience", st)
    story.append(role_header("Lead Engineer & Head of U.S. Team", "Ody", "May 2026 – Present", st))
    story += [
        bullet(
            "Shipped 107 merged PRs in 10 weeks across six product apps and the backend, owning features from PostgreSQL/Drizzle schemas and Hono APIs through OpenAPI/Orval clients to React and Expo interfaces.",
            st,
        ),
        bullet(
            "Delivered four merchant-facing platform features, including AI-assisted multilingual digital menus, email campaigns, and multi-location analytics, as secure production workflows.",
            st,
        ),
    ]
    story.append(
        role_header(
            "Co-Author Researcher",
            "Grand Valley State University",
            "Sep 2025 – Present",
            st,
        )
    )
    story += [
        bullet(
            "Developed and calibrated non-Newtonian, multiphase CFD models in OpenFOAM/RheoTool across 32 bioink-deposition conditions, achieving 96% agreement with experimental data.",
            st,
        ),
        bullet(
            "Engineered a Dockerized Python/JavaScript analysis platform with VTK-to-CSV pipelines and interactive visualizations for 15,300+ records across 51 timesteps per simulation.",
            st,
        ),
        bullet(
            "Built real-time nozzle-anomaly detection using computer vision and digital-twin modeling; co-authored a peer-reviewed ASEE paper and a bioprinting journal manuscript in preparation.",
            st,
        ),
    ]
    story.append(
        role_header(
            "Summer Researcher",
            "Grand Valley State University",
            "Jun 2025 – Aug 2026",
            st,
        )
    )
    story += [
        bullet(
            "Modeled orbital transfers, rendezvous, perturbations, and fuel-efficient formation flight in Octave and NASA GMAT; separately designed 3D-printed airfoils and Arduino-instrumented wind-tunnel experiments to study aerodynamic hysteresis.",
            st,
        )
    ]
    story.append(
        role_header(
            "Simulation & Robotics Engineering Intern",
            "Casual Simulation",
            "Feb 2024 – Jan 2026",
            st,
        )
    )
    story += [
        bullet(
            "Built a VR rowing-performance simulation adopted by a local high-school team and improved Arduino-based robotic-dog controls, increasing stability by 21%.",
            st,
        )
    ]

    story += section("Selected Projects", st)
    story.append(
        role_header(
            "No Spoilers — Full-Stack Web App & Chrome Extension",
            "nospoilers.xyz",
            "2026 – Present",
            st,
        )
    )
    story += [
        bullet(
            "Built spoiler-free discovery and watchlist workflows spanning 120 API handlers, 43 PostgreSQL models, and 42 user-facing page entry points; the privacy-first extension classifies spoilers on-device and the repository passes 54 automated tests.",
            st,
        )
    ]
    story.append(role_header("ViolinTwin — AI Practice Coach", "React Native/Expo", "2026", st))
    story += [
        bullet(
            "Prototyped real-time practice feedback with native Swift/Kotlin analysis scaffolding, audio capture, pitch/rhythm/note-timing estimation, and MusicXML/MIDI targets.",
            st,
        )
    ]
    story.append(role_header("Smart Plate — Accessible Nutrition App", "Defold/Lua", "2023 – 2025", st))
    story += [
        bullet(
            "Designed low-stimulation, gamified food-exposure workflows and a BLE-ready smart-plate architecture; a real-world pilot increased willingness to try new foods.",
            st,
        )
    ]
    story.append(
        role_header(
            "Founder & Lead Developer",
            "Helping Hands Soccer Training",
            "2022 – 2026",
            st,
        )
    )
    story += [
        bullet(
            "Built web/mobile matching and progress-tracking tools for a volunteer coaching nonprofit that donated $2,400 in scholarships.",
            st,
        )
    ]

    story += section("Honors", st)
    story.append(
        p(
            "DECA State Champion  |  2nd Place, GYM International STEM Innovation Challenge  |  "
            "International Astronomy &amp; Astrophysics Competition Finalist  |  Dartmouth Book Award  |  "
            "Published, International STEM Research Journal",
            st["body"],
        )
    )
    doc.build(story)


def cv_page(canvas, doc) -> None:
    configure_metadata(
        canvas,
        doc,
        "Ethan Moon — Technical Curriculum Vitae",
        "Technical curriculum vitae for software engineering and research opportunities",
    )
    canvas.saveState()
    if doc.page > 1:
        canvas.setFont(FONT_BOLD, 8)
        canvas.setFillColor(NAVY)
        canvas.drawString(doc.leftMargin, LETTER[1] - 0.35 * inch, "ETHAN MOON  /  TECHNICAL CV")
        canvas.setFont(FONT, 7.2)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(
            LETTER[0] - doc.rightMargin,
            LETTER[1] - 0.35 * inch,
            "github.com/emoon0108",
        )
        canvas.setStrokeColor(RULE)
        canvas.line(doc.leftMargin, LETTER[1] - 0.41 * inch, LETTER[0] - doc.rightMargin, LETTER[1] - 0.41 * inch)
    canvas.setFont(FONT, 7)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(LETTER[0] / 2, 0.26 * inch, f"Ethan Moon  •  Page {doc.page}")
    canvas.restoreState()


def build_cv() -> None:
    output = PUBLIC / "Ethan_Moon_CV.pdf"
    st = styles(8.15, 10.15)
    doc = BaseDocTemplate(
        str(output),
        pagesize=LETTER,
        leftMargin=0.56 * inch,
        rightMargin=0.56 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.44 * inch,
        title="Ethan Moon — Technical Curriculum Vitae",
        author="Ethan Moon",
        subject="Technical curriculum vitae",
    )
    first = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="first")
    later = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height - 0.24 * inch,
        id="later",
    )
    doc.addPageTemplates(
        [
            PageTemplate(id="first", frames=[first], onPage=cv_page, autoNextPageTemplate="later"),
            PageTemplate(id="later", frames=[later], onPage=cv_page),
        ]
    )

    story: list = contact_block(st)
    story.append(
        p(
            "Computer science engineering student and full-stack engineer building production software, "
            "scientific computing systems, and human-centered products. Experience spans TypeScript product "
            "platforms, React/Expo interfaces, PostgreSQL APIs, computer vision, and computational fluid dynamics.",
            st["body"],
        )
    )
    story += section("Education", st)
    story.append(
        role_header(
            "B.S.E. Computer Science, College of Engineering",
            "University of Michigan",
            "Expected May 2028",
            st,
            "Ann Arbor, MI",
        )
    )
    story.append(
        p(
            "<b>Coursework:</b> Computers &amp; Programming, Discrete Math, Proof-Based Linear Algebra, "
            "Multivariable Calculus, Differential Equations, Statistics, Physics",
            st["small"],
        )
    )

    story += section("Technical Expertise", st)
    story += [
        p("<b>Software:</b> TypeScript, JavaScript, Python, C++, SQL; React, Next.js, React Native/Expo, Node.js, Hono", st["body"]),
        p("<b>Data &amp; delivery:</b> PostgreSQL, Drizzle ORM, OpenAPI/Orval, Docker, Git, GitHub Actions, REST APIs", st["body"]),
        p("<b>Engineering &amp; research:</b> OpenFOAM/RheoTool, ParaView, NASA GMAT, Octave/MATLAB, Arduino/ESP32, computer vision, digital twins, experimental design", st["body"]),
        p("<b>Languages:</b> English and Korean (native/bilingual); Spanish (limited working)", st["body"]),
    ]

    story += section("Engineering Experience", st)
    story.append(role_header("Lead Engineer & Head of U.S. Team", "Ody", "May 2026 – Present", st))
    story += [
        bullet("Shipped 107 merged PRs in 10 weeks across six product apps and the backend, delivering database schemas, APIs, generated clients, web interfaces, and mobile workflows.", st),
        bullet("Built four merchant-facing feature areas, including AI-assisted multilingual menus, email campaigns, and multi-location analytics, with production-grade authorization and validation.", st),
        bullet("Worked across PostgreSQL/Drizzle, Hono, OpenAPI/Orval, React, and Expo in a shared TypeScript monorepo.", st),
    ]
    story.append(role_header("Co-Author Researcher", "Grand Valley State University", "Sep 2025 – Present", st))
    story += [
        bullet("Developed and calibrated non-Newtonian, multiphase CFD models for 32 bioink-deposition conditions in OpenFOAM/RheoTool, achieving 96% agreement with experimental data.", st),
        bullet("Built a Dockerized Python/JavaScript analysis platform with VTK-to-CSV pipelines and interactive visualizations for 15,300+ records across 51 timesteps per simulation.", st),
        bullet("Programmed real-time nozzle-anomaly detection using computer vision and digital-twin modeling; co-authored a peer-reviewed ASEE conference paper and is extending the work for journal submission.", st),
    ]
    story.append(role_header("Summer Researcher", "Grand Valley State University", "Jun 2025 – Aug 2026", st))
    story += [
        bullet("Orbital dynamics: simulated transfers, rendezvous, perturbations, and fuel-efficient satellite-formation maneuvers in Octave and NASA GMAT.", st),
        bullet("Aerodynamic hysteresis: designed and 3D-printed airfoil prototypes, instrumented wind-tunnel tests with Arduino sensors, and compared results with CFD simulations.", st),
    ]
    story.append(role_header("Simulation & Robotics Engineering Intern", "Casual Simulation", "Feb 2024 – Jan 2026", st))
    story += [
        bullet("Developed a VR rowing-performance simulation adopted by a local high-school rowing team and iterated on Arduino-based robotic-dog controls, improving stability by 21%.", st),
    ]
    story.append(role_header("Advanced Math Instructor", "Mathnasium", "Dec 2025 – Present", st))
    story += [
        bullet("Teach algebra, geometry, and precalculus through individualized explanations and targeted practice plans; mentor students in mathematical reasoning and problem-solving confidence.", st),
    ]

    story.append(PageBreak())
    story += section("Selected Engineering Projects", st)
    projects = [
        (
            "No Spoilers — Full-Stack Web App & Chrome Extension",
            "TypeScript, React, PostgreSQL",
            "2026 – Present",
            [
                "Built spoiler-free movie discovery and watchlist workflows spanning 120 API handlers, 43 PostgreSQL models, and 42 user-facing page entry points.",
                "Implemented a privacy-first browser extension with on-device spoiler classification and watchlist sync; the repository currently passes 54 automated tests.",
            ],
        ),
        (
            "ViolinTwin — AI Practice Coach",
            "React Native/Expo, Swift, Kotlin",
            "2026",
            [
                "Prototyped a mobile practice coach with native audio-analysis scaffolding, recording workflows, pitch/rhythm/note-timing estimation, and MusicXML/MIDI targets.",
                "Designed an offline-capable fallback analysis path and reproducible audio-analysis tests.",
            ],
        ),
        (
            "Smart Plate — Accessible Nutrition App",
            "Defold, Lua, BLE-ready architecture",
            "2023 – 2025",
            [
                "Designed low-stimulation, gamified food-exposure workflows with rewards, recommendations, progress tracking, and parent-facing feedback.",
                "Prototyped load-cell and microcontroller integration; a real-world pilot increased willingness to try new foods.",
            ],
        ),
        (
            "Helping Hands Soccer Training Platform",
            "Web/mobile product",
            "2022 – 2026",
            [
                "Built location- and goal-based coach/player matching plus progress dashboards for a volunteer nonprofit that donated $2,400 in scholarships.",
            ],
        ),
    ]
    for title, stack, date, points in projects:
        group = [role_header(title, stack, date, st)] + [bullet(point, st) for point in points]
        story.append(KeepTogether(group))

    story += section("Research & Publications", st)
    story += [
        p("<b>Closed-loop bioprinting and digital-twin research.</b> Co-authored and presented peer-reviewed work at the ASEE North Central Conference; continuing the CFD, vision, and controls work for a bioprinting journal manuscript.", st["body"]),
        p("<b>Alternative aviation fuels.</b> Authored comparative research on sustainable replacements for aviation kerosene, published through the International STEM Research Journal.", st["body"]),
    ]

    story += section("Leadership & Community", st)
    story.append(role_header("Founder & Head Coach", "Helping Hands, N.P.O.", "Feb 2022 – Apr 2026", st))
    story += [
        bullet("Founded a volunteer soccer-training nonprofit, recruited 10+ high-level coaches across the United States, and built the program's matching platform and operating workflows.", st),
        bullet("Directed coaching and fundraising that provided $2,400 in scholarships to young athletes.", st),
    ]
    story.append(role_header("Program & Exhibit Director", "Grand Rapids Public Museum", "May 2025", st))
    story += [
        bullet("Proposed and sourced a 25+ image astrophotography exhibit that the museum adopted as an interactive discovery cart; presented astronomy content to visitors.", st),
    ]
    story.append(role_header("Captain & Starting Defender", "Forest Hills Central Varsity Soccer", "2024 – 2026", st))
    story += [
        bullet("Led team strategy and culture while earning All-Conference, All-District, All-Region First Team, and All-State Honorable Mention recognition.", st),
    ]

    story += section("Selected Honors", st)
    honors = [
        "DECA State Champion, Integrated Marketing Campaign — Service (2026)",
        "Second Place Overall and Grand Prize Honorable Mention, Southwestern Michigan Science & Engineering Fair (2025)",
        "Dartmouth Book Award for academic achievement and leadership (2025)",
        "Finalist, International Astronomy & Astrophysics Competition (2025)",
        "Second Place, GYM International STEM Innovation Challenge (2025)",
        "AP Scholar with Distinction and College Board National Recognition Program Award (2025)",
        "First Prize, Golden Classical Music Awards international competitions; invited performances at Tokyo Opera City Hall, Walt Disney Concert Hall, and Carnegie Hall (2024–2025)",
    ]
    story += [bullet(item, st) for item in honors]

    story += section("Additional Service", st)
    story.append(
        p(
            "Grand Rapids Public Museum planetarium volunteer  |  MYLEAD alumni mentor  |  Youth soccer coach and certified referee  |  Korean-community math tutor  |  International STEM Research Journal senior editor",
            st["body"],
        )
    )
    doc.build(story)


if __name__ == "__main__":
    PUBLIC.mkdir(parents=True, exist_ok=True)
    build_resume()
    build_cv()
    print(f"Wrote {PUBLIC / 'Ethan_Moon_Resume.pdf'}")
    print(f"Wrote {PUBLIC / 'Ethan_Moon_CV.pdf'}")
