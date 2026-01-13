# BA Artifacts Auto-Downloader Script
# Usage: .\download-artifacts.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  BA Portfolio - Artifacts Downloader" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$baseDir = "d:\portfolio_thienphuc\public\artifacts"

# Ensure directories exist
$dirs = @(
    "banking-core",
    "predictive-analytics", 
    "security-protocol",
    "shared"
)

foreach ($dir in $dirs) {
    $path = Join-Path $baseDir $dir
    if (-not (Test-Path $path)) {
        New-Item -Path $path -ItemType Directory -Force | Out-Null
        Write-Host "✓ Created directory: $dir" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Starting downloads..." -ForegroundColor Yellow
Write-Host ""

# Download function with retry and error handling
function Download-Image {
    param(
        [string]$url,
        [string]$output,
        [string]$description
    )
    
    $fullPath = Join-Path $baseDir $output
    
    Write-Host "[$description]" -ForegroundColor Cyan
    Write-Host "  URL: $url" -ForegroundColor Gray
    Write-Host "  Saving to: $output" -ForegroundColor Gray
    
    try {
        $ProgressPreference = 'SilentlyContinue'  # Faster downloads
        Invoke-WebRequest -Uri $url -OutFile $fullPath -ErrorAction Stop -TimeoutSec 30
        
        # Check file size
        $fileSize = (Get-Item $fullPath).Length / 1KB
        Write-Host "  ✓ Downloaded successfully ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "  → Manual download required" -ForegroundColor Yellow
        return $false
    }
    finally {
        Write-Host ""
    }
}

# Track statistics
$totalFiles = 0
$successCount = 0
$failedCount = 0

# ============================================
# BANKING CORE PROJECT
# ============================================

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host " Banking Core System Artifacts" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""

$totalFiles++
if (Download-Image `
    -url "https://media.geeksforgeeks.org/wp-content/uploads/20201003202149/BankingSystemUseCaseDiagram.png" `
    -output "banking-core\use-case-diagram.png" `
    -description "Use Case Diagram") {
    $successCount++
} else {
    $failedCount++
}

$totalFiles++
if (Download-Image `
    -url "https://www.mindtools.com/media/Diagrams/power-interest-grid.jpg" `
    -output "banking-core\stakeholder-grid.png" `
    -description "Stakeholder Power/Interest Grid") {
    $successCount++
} else {
    $failedCount++
}

$totalFiles++
if (Download-Image `
    -url "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" `
    -output "banking-core\wireframe-dashboard.png" `
    -description "Dashboard Wireframe") {
    $successCount++
} else {
    $failedCount++
}

$totalFiles++
if (Download-Image `
    -url "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" `
    -output "banking-core\data-analytics.png" `
    -description "Data Analytics Concept") {
    $successCount++
} else {
    $failedCount++
}

# ============================================
# PREDICTIVE ANALYTICS PROJECT
# ============================================

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host " Predictive Analytics Artifacts" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""

$totalFiles++
if (Download-Image `
    -url "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" `
    -output "predictive-analytics\dashboard-concept.png" `
    -description "BI Dashboard Concept") {
    $successCount++
} else {
    $failedCount++
}

# ============================================
# SHARED RESOURCES
# ============================================

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host " Shared Resources" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""

$totalFiles++
if (Download-Image `
    -url "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80" `
    -output "shared\team-collaboration.png" `
    -description "Team Collaboration") {
    $successCount++
} else {
    $failedCount++
}

# ============================================
# SUMMARY
# ============================================

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Download Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Total files attempted: $totalFiles" -ForegroundColor White
Write-Host "  ✓ Successful: $successCount" -ForegroundColor Green
Write-Host "  ✗ Failed: $failedCount" -ForegroundColor Red
Write-Host ""

if ($failedCount -gt 0) {
    Write-Host "⚠ Some downloads failed. Please:" -ForegroundColor Yellow
    Write-Host "  1. Check your internet connection" -ForegroundColor Yellow
    Write-Host "  2. Manually download failed images from:" -ForegroundColor Yellow
    Write-Host "     public\artifacts\download-instructions.md" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Verify images: Get-ChildItem -Path '$baseDir' -Recurse" -ForegroundColor White
Write-Host "  2. Review artifacts: Open 'public\artifacts' folder" -ForegroundColor White
Write-Host "  3. Update code with local paths" -ForegroundColor White
Write-Host ""
Write-Host "✓ Script completed!" -ForegroundColor Green
