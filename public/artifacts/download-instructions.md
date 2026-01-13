# BA Artifacts Download Instructions

Hướng dẫn download các BA artifacts để host locally trong portfolio.

## Folder Structure

```
public/artifacts/
├── banking-core/           # Banking Core System project
│   ├── bpmn-asis.png
│   ├── bpmn-tobe.png
│   ├── use-case-diagram.png
│   ├── sequence-diagram.png
│   ├── user-story-map.png
│   ├── rtm-matrix.png
│   ├── stakeholder-grid.png
│   ├── gap-analysis.png
│   ├── wireframe-dashboard.png
│   └── 5-whys-export.png
│
├── predictive-analytics/   # Predictive Analytics project
│   ├── data-flow.png
│   ├── dashboard-powerbi.png
│   ├── use-case-diagram.png
│   └── wireframe-bi.png
│
├── security-protocol/      # Security Protocol X project
│   ├── iam-sequence.png
│   ├── access-flow.png
│   └── compliance-matrix.png
│
└── shared/                 # Shared resources
    ├── mom-template.png
    ├── jira-board.png
    └── stakeholder-grid-template.png
```

---

## Priority Downloads (Cần tải ngay)

### Banking Core System (9 images)

#### 1. BPMN As-Is Diagram
```bash
# Source: Cloudairy
# URL: https://cloudairy.com/wp-content/uploads/2024/02/loan-approval-process-1024x522.png
# Save as: banking-core/bpmn-asis.png
```
**Cách download:**
- Click chuột phải vào link
- Save Image As...
- Đặt tên: `bpmn-asis.png`
- Lưu vào: `d:\portfolio_thienphuc\public\artifacts\banking-core\`

**Alternative nếu link broken:**
- Google: "BPMN loan approval process diagram"
- Tìm ảnh chất lượng cao
- Hoặc dùng: https://www.visual-paradigm.com/features/bpmn-tool/

---

#### 2. BPMN To-Be Diagram
```bash
# Source: Lucidchart
# URL: https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/seo/BPMN/discovery/BPMN-diagram-example.svg
# Save as: banking-core/bpmn-tobe.png
# Note: Convert SVG to PNG (1200x600)
```

**Cách convert SVG → PNG:**
1. Mở SVG trong browser
2. Screenshot hoặc dùng online tool: https://svgtopng.com/
3. Resize to 1200px width

---

#### 3. Use Case Diagram
```bash
# Source: GeeksforGeeks
# URL: https://media.geeksforgeeks.org/wp-content/uploads/20201003202149/BankingSystemUseCaseDiagram.png
# Save as: banking-core/use-case-diagram.png
```

**Direct download command (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://media.geeksforgeeks.org/wp-content/uploads/20201003202149/BankingSystemUseCaseDiagram.png" -OutFile "d:\portfolio_thienphuc\public\artifacts\banking-core\use-case-diagram.png"
```

---

#### 4. Sequence Diagram
```bash
# Source: ConceptDraw
# URL: https://www.conceptdraw.com/solution-park/resource/images/solutions/uml-sequence-diagram/DIAGRAMS-UML-Sequence-Diagram-Bank-System.png
# Save as: banking-core/sequence-diagram.png
```

---

#### 5. User Story Map
```bash
# Source: StoriesOnBoard
# URL: https://storiesonboard.com/images/story-map-example.png
# Save as: banking-core/user-story-map.png
```

---

#### 6. RTM Matrix
```bash
# Source: SlideTeam
# URL: https://www.slideteam.net/media/catalog/product/cache/1280x720/r/e/requirement_traceability_matrix_example_ppt_slide_Slide01.jpg
# Save as: banking-core/rtm-matrix.png
```

---

#### 7. Stakeholder Grid
```bash
# Source: MindTools
# URL: https://www.mindtools.com/media/Diagrams/power-interest-grid.jpg
# Save as: banking-core/stakeholder-grid.png
```

---

#### 8. Wireframe Dashboard
```bash
# Source: Unsplash (fallback)
# URL: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200
# Save as: banking-core/wireframe-dashboard.png
```

---

#### 9. 5 Whys Diagram
```bash
# Source: Lean Six Sigma
# URL: https://www.sixsigmainstitute.org/images/5-whys-example.png
# Save as: banking-core/5-whys-export.png
```

---

### Predictive Analytics (4 images)

#### 10. Power BI Dashboard
```bash
# URL: https://powerbi.microsoft.com/pictures/financial-dashboard-sample.jpg
# Save as: predictive-analytics/dashboard-powerbi.png
```

#### 11. Data Flow Diagram
```bash
# URL: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200
# Save as: predictive-analytics/data-flow.png
```

---

### Shared Resources (3 images)

#### 12. Jira Board Screenshot
```bash
# URL: https://wac-cdn.atlassian.com/dam/jcr:example-scrum-board.png
# Save as: shared/jira-board.png
```

#### 13. Meeting Minutes Template
```bash
# Create a simple screenshot of a MoM template
# Save as: shared/mom-template.png
```

---

## PowerShell Script - Auto Download

Tạo file `download-artifacts.ps1` với nội dung sau:

```powershell
# BA Artifacts Downloader
Write-Host "Starting BA Artifacts Download..." -ForegroundColor Green

$baseDir = "d:\portfolio_thienphuc\public\artifacts"

# Download function with error handling
function Download-Image {
    param($url, $output)
    try {
        Write-Host "Downloading: $output" -ForegroundColor Cyan
        Invoke-WebRequest -Uri $url -OutFile "$baseDir\$output" -ErrorAction Stop
        Write-Host "✓ Success: $output" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed: $output - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Banking Core
Download-Image "https://media.geeksforgeeks.org/wp-content/uploads/20201003202149/BankingSystemUseCaseDiagram.png" "banking-core\use-case-diagram.png"

Download-Image "https://www.mindtools.com/media/Diagrams/power-interest-grid.jpg" "banking-core\stakeholder-grid.png"

Download-Image "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200" "banking-core\wireframe-dashboard.png"

Download-Image "https://storiesonboard.com/images/story-map-example.png" "banking-core\user-story-map.png"

# Add more downloads here...

Write-Host "`nDownload completed!" -ForegroundColor Green
Write-Host "Check: $baseDir" -ForegroundColor Yellow
```

**Run script:**
```powershell
cd d:\portfolio_thienphuc
.\download-artifacts.ps1
```

---

## Manual Download Method (Recommended)

Vì một số URLs có thể bị CORS hoặc authentication, tôi khuyên bạn:

### Bước 1: Mở Browser
1. Mở file `ba_artifacts_resources.md`
2. Click vào từng URL
3. Chuột phải → Save Image As...
4. Lưu vào đúng folder tương ứng

### Bước 2: Verify Images
```powershell
# Check số lượng files đã download
Get-ChildItem -Path "d:\portfolio_thienphuc\public\artifacts" -Recurse -File | Measure-Object
```

### Bước 3: Optimize Images (Optional)
```powershell
# Install imagemagick (if not installed)
# choco install imagemagick

# Compress PNGs
Get-ChildItem -Path "d:\portfolio_thienphuc\public\artifacts" -Filter *.png -Recurse | ForEach-Object {
    magick convert $_.FullName -quality 85 $_.FullName
}
```

---

## Alternative: Use Placeholders First

Nếu bạn muốn test trước khi download:

```typescript
// Use placeholder.com
ba_artifacts: {
  bpmn_asis: "https://via.placeholder.com/1200x600/1a1a1a/ffffff/?text=BPMN+As-Is",
  bpmn_tobe: "https://via.placeholder.com/1200x600/1a1a1a/ffffff/?text=BPMN+To-Be",
  // ... etc
}
```

Sau đó thay thế bằng real images.

---

## After Download Complete

Update paths trong code:

```typescript
ba_artifacts: {
  bpmn_asis: "/artifacts/banking-core/bpmn-asis.png",
  bpmn_tobe: "/artifacts/banking-core/bpmn-tobe.png",
  use_case_diagram: "/artifacts/banking-core/use-case-diagram.png",
  // ... etc
}
```

---

## Checklist

- [ ] Create folder structure ✓ (đã tạo tự động)
- [ ] Download 9 images for Banking Core
- [ ] Download 4 images for Predictive Analytics
- [ ] Download 3 shared resources
- [ ] Verify all images load correctly
- [ ] Optimize image sizes (< 500KB each)
- [ ] Test in dev environment (`npm run dev`)

---

## Need Help?

Nếu gặp vấn đề download, ping tôi và tôi sẽ:
1. Tìm alternative sources
2. Provide backup URLs
3. Suggest công cụ tạo diagrams nhanh
