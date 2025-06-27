---
layout: default
title: Benchmark Transcripts
---

<style>
/* Full width responsive layout - keeping default theme colors */
html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    min-height: 100vh !important;
}

.container, .main-content, .content, .page-content, .wrapper {
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
}

/* Responsive padding for readability */
@media (min-width: 768px) {
    .container, .main-content, .content, .page-content {
        padding: 0 20px !important;
    }
}

@media (min-width: 1200px) {
    .container, .main-content, .content, .page-content {
        padding: 0 40px !important;
    }
}

/* Embedded HTML App Styles */
.github-browser-container {
    resize: both;
    overflow: auto;
    min-width: 800px;
    min-height: 600px;
    width: 100%;
    height: 80vh;
    border: 2px solid #30363d;
    border-radius: 8px;
    background: #0d1117;
    position: relative;
}

.github-browser-container::after {
    content: "⟲";
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: #7d8590;
    font-size: 14px;
    pointer-events: none;
}

.main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
    height: 100%;
    width: 100%;
}

/* Responsive adjustments for mobile */
@media (max-width: 768px) {
    .github-browser-container {
        min-width: 100%;
        resize: vertical;
        height: 70vh;
        min-height: 500px;
    }
    
    .main-content {
        flex-direction: column;
    }
    
    .file-browser {
        width: 100% !important;
        height: 40vh;
        border-right: none !important;
        border-bottom: 1px solid #30363d;
    }
    
    .preview-pane {
        height: 60vh;
    }
    
    .header {
        padding: 15px !important;
    }
    
    .repo-input {
        flex-direction: column !important;
        gap: 15px !important;
    }
    
    .repo-input input {
        width: 100% !important;
    }
    
    .repo-input button {
        width: 100% !important;
        padding: 12px !important;
    }
}

/* Tablet adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
    .github-browser-container {
        min-width: 700px;
        min-height: 500px;
    }
    
    .file-browser {
        width: 35% !important;
    }
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0d1117;
    color: #e6edf3;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    background: #161b22;
    border-bottom: 1px solid #30363d;
    padding: 20px;
}

.header h1 {
    margin-bottom: 15px;
    color: #f0f6fc;
}

.repo-input {
    display: flex;
    gap: 10px;
    align-items: center;
}

.repo-input input {
    flex: 1;
    padding: 10px 12px;
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    color: #e6edf3;
    font-size: 14px;
}

.repo-input input:focus {
    outline: none;
    border-color: #1f6feb;
    box-shadow: 0 0 0 3px rgba(31, 111, 235, 0.15);
}

.repo-input button {
    padding: 10px 16px;
    background: #238636;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
}

.repo-input button:hover:not(:disabled) {
    background: #2ea043;
}

.repo-input button:disabled {
    background: #484f58;
    cursor: not-allowed;
}

.main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.file-browser {
    width: 40%;
    background: #0d1117;
    border-right: 1px solid #30363d;
    overflow-y: auto;
}

.preview-pane {
    flex: 1;
    background: #f6f8fa;
    position: relative;
}

.file-list {
    padding: 20px;
}

.file-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.15s ease;
    margin-bottom: 2px;
}

.file-item:hover {
    background: #21262d;
}

.file-item.folder {
    color: #7d8590;
}

.file-item.html-file {
    color: #f85149;
}

.file-item.json-file {
    color: #ffa657;
}

.file-item.selected {
    background: #1f6feb;
    color: white;
}

.file-icon {
    margin-right: 8px;
    font-size: 16px;
}

.breadcrumb {
    padding: 15px 20px;
    background: #161b22;
    border-bottom: 1px solid #30363d;
    font-size: 14px;
    color: #7d8590;
}

.breadcrumb a {
    color: #58a6ff;
    text-decoration: none;
    cursor: pointer;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #7d8590;
}

.error {
    padding: 20px;
    color: #f85149;
    background: #0d1117;
}

.preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.json-preview {
    width: 100%;
    height: 100%;
    background: #f6f8fa;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
}

.json-content {
    background: #161b22;
    color: #e6edf3;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #30363d;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.json-header {
    background: #161b22;
    color: #f0f6fc;
    padding: 15px 20px;
    border-bottom: 1px solid #30363d;
    font-weight: 600;
    font-size: 16px;
}

.json-string { color: #a5d6ff; }
.json-number { color: #79c0ff; }
.json-boolean { color: #ffab70; }
.json-null { color: #f85149; }
.json-key { color: #7ee787; }
.json-punctuation { color: #e6edf3; }

.preview-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #656d76;
    font-size: 16px;
    background: #f6f8fa;
}

.spinner {
    border: 2px solid #30363d;
    border-top: 2px solid #58a6ff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-right: 10px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

<div class="github-browser-container">
<div class="header">
    <h1>🐙 GitHub Repository Browser</h1>
    <div class="repo-input">
        <input 
            type="text" 
            id="repoUrl" 
            placeholder="Enter GitHub repository URL (e.g., https://github.com/user/repo)"
            value=""
        >
        <button id="loadRepo">Browse Repository</button>
    </div>
</div>

<div class="main-content">
    <div class="file-browser">
        <div class="breadcrumb" id="breadcrumb" style="display: none;">
            <span id="breadcrumbPath"></span>
        </div>
        <div class="file-list" id="fileList">
            <div class="preview-placeholder">
                Enter a GitHub repository URL above to start browsing
            </div>
        </div>
    </div>
</div>

    <div class="preview-pane">
        <div class="preview-placeholder" id="previewPlaceholder">
            Click on an HTML file to preview it here
        </div>
    </div>
</div>

<script>
class GitHubBrowser {
    constructor() {
        this.repoOwner = '';
        this.repoName = '';
        this.currentPath = '';
        this.selectedFile = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('loadRepo').addEventListener('click', () => this.loadRepository());
        document.getElementById('repoUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.loadRepository();
        });
    }

    parseGitHubUrl(url) {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (match) {
            return {
                owner: match[1],
                repo: match[2].replace(/\.git$/, '')
            };
        }
        return null;
    }

    async loadRepository() {
        const url = document.getElementById('repoUrl').value.trim();
        if (!url) return;

        const parsed = this.parseGitHubUrl(url);
        if (!parsed) {
            this.showError('Invalid GitHub repository URL');
            return;
        }

        this.repoOwner = parsed.owner;
        this.repoName = parsed.repo;
        this.currentPath = '';

        await this.loadDirectoryContents('');
    }

    async loadDirectoryContents(path) {
        this.showLoading();
        this.currentPath = path;

        try {
            const apiUrl = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${path}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Repository not found or API limit exceeded`);
            }

            const contents = await response.json();
            this.renderFileList(contents);
            this.renderBreadcrumb();
        } catch (error) {
            this.showError(`Error loading repository: ${error.message}`);
        }
    }

    renderFileList(contents) {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';

        // Sort: directories first, then files
        const sorted = contents.sort((a, b) => {
            if (a.type === 'dir' && b.type !== 'dir') return -1;
            if (a.type !== 'dir' && b.type === 'dir') return 1;
            return a.name.localeCompare(b.name);
        });

        sorted.forEach(item => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            if (item.type === 'dir') {
                fileItem.classList.add('folder');
                fileItem.innerHTML = `
                    <span class="file-icon">📁</span>
                    <span>${item.name}</span>
                `;
                fileItem.addEventListener('click', () => {
                    this.loadDirectoryContents(item.path);
                });
            } else {
                const isHtml = item.name.toLowerCase().endsWith('.html') || item.name.toLowerCase().endsWith('.htm');
                const isJson = item.name.toLowerCase().endsWith('.json');
                
                if (isHtml) {
                    fileItem.classList.add('html-file');
                } else if (isJson) {
                    fileItem.classList.add('json-file');
                }
                
                fileItem.innerHTML = `
                    <span class="file-icon">${this.getFileIcon(item.name)}</span>
                    <span>${item.name}</span>
                `;

                if (isHtml) {
                    fileItem.addEventListener('click', () => {
                        this.previewHtmlFile(item);
                        this.selectFile(fileItem);
                    });
                } else if (isJson) {
                    fileItem.addEventListener('click', () => {
                        this.previewJsonFile(item);
                        this.selectFile(fileItem);
                    });
                }
            }

            fileList.appendChild(fileItem);
        });
    }

    getFileIcon(filename) {
        const ext = filename.toLowerCase().split('.').pop();
        const icons = {
            'html': '🌐',
            'htm': '🌐',
            'css': '🎨',
            'js': '⚡',
            'json': '📋',
            'md': '📝',
            'txt': '📄',
            'png': '🖼️',
            'jpg': '🖼️',
            'jpeg': '🖼️',
            'gif': '🖼️',
            'svg': '🖼️'
        };
        return icons[ext] || '📄';
    }

    previewJsonFile(file) {
        const previewPane = document.querySelector('.preview-pane');
        
        // Show loading state
        previewPane.innerHTML = `
            <div class="json-preview">
                <div class="json-header">📋 ${file.name}</div>
                <div class="loading">
                    <div class="spinner"></div>
                    Loading JSON file...
                </div>
            </div>
        `;
        
        // Fetch and display JSON
        fetch(file.download_url)
            .then(response => response.text())
            .then(jsonText => {
                try {
                    // Try to parse and pretty-print JSON
                    const jsonObj = JSON.parse(jsonText);
                    const prettyJson = JSON.stringify(jsonObj, null, 2);
                    const highlightedJson = this.highlightJson(prettyJson);
                    
                    previewPane.innerHTML = `
                        <div class="json-preview">
                            <div class="json-header">📋 ${file.name}</div>
                            <div class="json-content">${highlightedJson}</div>
                        </div>
                    `;
                } catch (error) {
                    // If JSON is invalid, show raw content
                    previewPane.innerHTML = `
                        <div class="json-preview">
                            <div class="json-header">📋 ${file.name} (Invalid JSON)</div>
                            <div class="json-content">${this.escapeHtml(jsonText)}</div>
                        </div>
                    `;
                }
            })
            .catch(error => {
                previewPane.innerHTML = `
                    <div class="json-preview">
                        <div class="json-header">📋 ${file.name}</div>
                        <div class="error">
                            ❌ Error loading JSON file: ${error.message}
                        </div>
                    </div>
                `;
            });
    }

    highlightJson(jsonString) {
        return jsonString
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/(".*?")(\s*:)/g, '<span class="json-key">$1</span><span class="json-punctuation">$2</span>')
            .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
            .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
            .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
            .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
            .replace(/([{}\[\],])/g, '<span class="json-punctuation">$1</span>');
    }

    selectFile(fileElement) {
        // Remove previous selection
        document.querySelectorAll('.file-item.selected').forEach(el => {
            el.classList.remove('selected');
        });
        // Add selection to current file
        fileElement.classList.add('selected');
    }

    previewHtmlFile(file) {
        const previewPane = document.querySelector('.preview-pane');
        const rawUrl = file.download_url;
        const previewUrl = `https://htmlpreview.github.io/?${rawUrl}`;
        
        previewPane.innerHTML = `
            <iframe class="preview-iframe" src="${previewUrl}"></iframe>
        `;
    }

    renderBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        const breadcrumbPath = document.getElementById('breadcrumbPath');
        
        if (this.currentPath === '') {
            breadcrumb.style.display = 'none';
            return;
        }

        breadcrumb.style.display = 'block';
        const pathParts = this.currentPath.split('/');
        const breadcrumbHtml = [
            `<a onclick="browser.loadDirectoryContents('')">${this.repoName}</a>`
        ];

        let currentPath = '';
        pathParts.forEach((part, index) => {
            currentPath += (index === 0 ? '' : '/') + part;
            if (index === pathParts.length - 1) {
                breadcrumbHtml.push(part);
            } else {
                breadcrumbHtml.push(`<a onclick="browser.loadDirectoryContents('${currentPath}')">${part}</a>`);
            }
        });

        breadcrumbPath.innerHTML = breadcrumbHtml.join(' / ');
    }

    showLoading() {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                Loading repository contents...
            </div>
        `;
    }

    showError(message) {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = `
            <div class="error">
                ❌ ${message}
            </div>
        `;
    }
}

// Initialize the browser
const browser = new GitHubBrowser();

// Set a default example repository
document.getElementById('repoUrl').value = 'https://github.com/clembench/clembench-runs';
</script>