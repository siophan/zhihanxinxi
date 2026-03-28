# 知涵信息官网 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scrolling website for 上海知涵信息科技有限公司 as a brand showcase.

**Architecture:** Pure static site — one HTML page with all sections, a CSS file for styling (modern gradient theme, responsive), and a JS file for interactions (scroll animations, mobile menu, smooth navigation). No build tools, no frameworks.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript (Intersection Observer API)

---

## File Structure

```
index.html          — 主页面，包含所有板块的 HTML 结构
css/style.css       — 所有样式：布局、配色、响应式、动画
js/main.js          — 交互逻辑：导航、滚动动画、表单、返回顶部
assets/icons/       — SVG 图标（内联在 HTML 中，无需额外文件）
```

---

### Task 1: 项目骨架与导航栏

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`

- [ ] **Step 1: 创建 HTML 骨架与导航栏结构**

创建 `index.html`，包含完整的 HTML 文档结构、meta 标签、Google Fonts 引入、导航栏 HTML，以及所有板块的空 `<section>` 占位：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>上海知涵信息科技有限公司</title>
    <meta name="description" content="上海知涵信息科技有限公司 — 专注软件开发、AI 智能与企业 SaaS 解决方案">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <a href="#hero" class="nav-logo">知涵信息</a>
            <button class="nav-toggle" id="navToggle" aria-label="菜单">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#hero" class="nav-link active">首页</a></li>
                <li><a href="#about" class="nav-link">关于我们</a></li>
                <li><a href="#services" class="nav-link">产品服务</a></li>
                <li><a href="#cases" class="nav-link">案例展示</a></li>
                <li><a href="#news" class="nav-link">新闻动态</a></li>
                <li><a href="#contact" class="nav-link">联系我们</a></li>
            </ul>
        </div>
    </nav>

    <section id="hero" class="hero"></section>
    <section id="about" class="section"></section>
    <section id="services" class="section"></section>
    <section id="cases" class="section"></section>
    <section id="news" class="section"></section>
    <section id="contact" class="section"></section>
    <footer class="footer"></footer>

    <button class="back-to-top" id="backToTop" aria-label="返回顶部">↑</button>

    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: 创建基础 CSS — reset、CSS 变量、导航栏样式**

创建 `css/style.css`：

```css
/* === Reset & Base === */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --color-primary: #667eea;
    --color-secondary: #764ba2;
    --gradient: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    --color-text: #333333;
    --color-text-light: #666666;
    --color-bg: #ffffff;
    --color-bg-light: #f8f9fa;
    --color-border: #e9ecef;
    --font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --nav-height: 70px;
    --container-width: 1200px;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--nav-height);
}

body {
    font-family: var(--font-family);
    color: var(--color-text);
    background: var(--color-bg);
    line-height: 1.6;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 20px;
}

/* === Navbar === */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-height);
    z-index: 1000;
    transition: background 0.3s, box-shadow 0.3s;
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
}

.navbar.scrolled .nav-logo {
    color: var(--color-primary);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 8px;
}

.nav-link {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: color 0.3s, background 0.3s;
}

.nav-link:hover,
.nav-link.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
}

.navbar.scrolled .nav-link {
    color: var(--color-text-light);
}

.navbar.scrolled .nav-link:hover,
.navbar.scrolled .nav-link.active {
    color: var(--color-primary);
    background: rgba(102, 126, 234, 0.1);
}

/* Hamburger */
.nav-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
}

.nav-toggle span {
    width: 24px;
    height: 2px;
    background: #fff;
    transition: background 0.3s, transform 0.3s;
}

.navbar.scrolled .nav-toggle span {
    background: var(--color-text);
}

/* Mobile */
@media (max-width: 768px) {
    .nav-toggle {
        display: flex;
    }

    .nav-menu {
        display: none;
        position: absolute;
        top: var(--nav-height);
        left: 0;
        right: 0;
        flex-direction: column;
        background: #fff;
        padding: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-menu.open {
        display: flex;
    }

    .nav-menu .nav-link {
        color: var(--color-text);
        padding: 12px 16px;
    }

    .nav-menu .nav-link:hover,
    .nav-menu .nav-link.active {
        color: var(--color-primary);
        background: rgba(102, 126, 234, 0.1);
    }
}

/* === Back to Top === */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--gradient);
    color: #fff;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    transform: translateY(-3px);
}

/* === Scroll Animation === */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```

- [ ] **Step 3: 创建 JS — 导航栏滚动、汉堡菜单、活跃导航高亮、返回顶部、滚动动画**

创建 `js/main.js`：

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    // Navbar scroll effect
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
        backToTop.classList.toggle('visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // Active nav link on scroll
    const observerNav = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(section => observerNav.observe(section));

    // Scroll fade-in animation
    const observerFade = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerFade.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observerFade.observe(el));

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = '提交成功！';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '提交留言';
                btn.disabled = false;
                form.reset();
            }, 2000);
        });
    }
});
```

- [ ] **Step 4: 在浏览器中打开 index.html 验证导航栏显示正确**

Run: 在浏览器中打开 `index.html`，确认：
- 导航栏顶部固定，文字白色（页面顶部时背景透明）
- 滚动后导航栏变白底带阴影
- 移动端出现汉堡菜单
- 返回顶部按钮在滚动后出现

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: add project skeleton with navbar, scroll effects, and mobile menu"
```

---

### Task 2: Hero 区域

**Files:**
- Modify: `index.html` — 替换 `<section id="hero">` 内容
- Modify: `css/style.css` — 添加 Hero 样式

- [ ] **Step 1: 填充 Hero HTML**

替换 `index.html` 中的 `<section id="hero" class="hero"></section>` 为：

```html
<section id="hero" class="hero">
    <div class="hero-content">
        <h1 class="hero-title">以科技驱动创新<br>用智慧赋能未来</h1>
        <p class="hero-subtitle">专注软件开发、AI 智能与企业 SaaS 解决方案</p>
        <a href="#about" class="hero-btn">了解更多</a>
    </div>
</section>
```

- [ ] **Step 2: 添加 Hero CSS**

在 `css/style.css` 中添加：

```css
/* === Hero === */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient);
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 0 20px;
}

.hero::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 40%);
    animation: heroFloat 15s ease-in-out infinite;
}

@keyframes heroFloat {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(30px, -30px) rotate(3deg); }
}

.hero-content {
    position: relative;
    z-index: 1;
}

.hero-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #fff;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 20px;
}

.hero-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 40px;
}

.hero-btn {
    display: inline-block;
    padding: 14px 40px;
    background: #fff;
    color: var(--color-primary);
    text-decoration: none;
    border-radius: 50px;
    font-weight: 500;
    font-size: 1rem;
    transition: transform 0.3s, box-shadow 0.3s;
}

.hero-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

- [ ] **Step 3: 验证 Hero 显示**

在浏览器中确认：全屏渐变背景、标题居中、按钮可点击跳转、背景有微妙浮动动画。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add hero section with gradient background and floating animation"
```

---

### Task 3: 关于我们板块

**Files:**
- Modify: `index.html` — 替换 `<section id="about">` 内容
- Modify: `css/style.css` — 添加关于我们和时间线样式

- [ ] **Step 1: 填充关于我们 HTML**

替换 `index.html` 中的 `<section id="about" class="section"></section>` 为：

```html
<section id="about" class="section">
    <div class="container">
        <h2 class="section-title fade-in">关于我们</h2>
        <div class="about-grid fade-in">
            <div class="about-text">
                <p>上海知涵信息科技有限公司成立于上海，是一家专注于软件开发、人工智能和企业级 SaaS 解决方案的科技公司。我们致力于用技术为企业赋能，帮助客户实现数字化转型。</p>
                <p>公司汇聚了一批经验丰富的技术专家和行业顾问，在软件定制开发、AI 应用落地、企业信息化建设等领域积累了丰富的实践经验。</p>
                <p>秉承"以客户为中心、以技术为驱动"的理念，我们为各行业客户提供高质量、高性价比的技术服务和产品解决方案。</p>
            </div>
            <div class="about-image">
                <div class="about-image-placeholder">
                    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="150" rx="8" fill="url(#aboutGrad)"/>
                        <path d="M60 110 L100 50 L140 110Z" fill="rgba(255,255,255,0.3)"/>
                        <circle cx="70" cy="50" r="15" fill="rgba(255,255,255,0.3)"/>
                        <defs><linearGradient id="aboutGrad" x1="0" y1="0" x2="200" y2="150"><stop stop-color="#667eea"/><stop offset="1" stop-color="#764ba2"/></linearGradient></defs>
                    </svg>
                </div>
            </div>
        </div>
        <div class="timeline fade-in">
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-year">2019</span>
                    <p>公司成立，扎根上海，聚焦软件开发服务</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-year">2021</span>
                    <p>组建 AI 研发团队，拓展智能化解决方案</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-year">2023</span>
                    <p>推出企业级 SaaS 平台，服务客户突破百家</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-year">2025</span>
                    <p>持续创新，全面布局 AI + SaaS 融合生态</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: 添加关于我们 CSS**

在 `css/style.css` 中添加：

```css
/* === Sections Common === */
.section {
    padding: 100px 0;
}

.section:nth-child(even) {
    background: var(--color-bg-light);
}

.section-title {
    text-align: center;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    margin-bottom: 60px;
    position: relative;
    padding-bottom: 15px;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--gradient);
    border-radius: 2px;
}

/* === About === */
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    margin-bottom: 80px;
}

.about-text p {
    color: var(--color-text-light);
    margin-bottom: 16px;
    line-height: 1.8;
}

.about-image-placeholder {
    border-radius: 12px;
    overflow: hidden;
}

.about-image-placeholder svg {
    width: 100%;
    height: auto;
    display: block;
}

/* Timeline */
.timeline {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 40px;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-border);
}

.timeline-item {
    text-align: center;
    position: relative;
    flex: 1;
}

.timeline-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--gradient);
    margin: 0 auto 20px;
    position: relative;
    z-index: 1;
}

.timeline-year {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 8px;
}

.timeline-content p {
    color: var(--color-text-light);
    font-size: 0.9rem;
    padding: 0 10px;
}

@media (max-width: 768px) {
    .about-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .timeline {
        flex-direction: column;
        gap: 30px;
        padding-left: 30px;
    }

    .timeline::before {
        top: 0;
        bottom: 0;
        left: 7px;
        right: auto;
        width: 2px;
        height: auto;
    }

    .timeline-item {
        text-align: left;
    }

    .timeline-dot {
        position: absolute;
        left: -30px;
        top: 4px;
        margin: 0;
    }
}
```

- [ ] **Step 3: 验证关于我们板块**

确认：左文右图布局、时间线水平排列、移动端自动堆叠和垂直时间线、滚动淡入动画。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add about section with company intro and timeline"
```

---

### Task 4: 产品与服务板块

**Files:**
- Modify: `index.html` — 替换 `<section id="services">` 内容
- Modify: `css/style.css` — 添加服务卡片样式

- [ ] **Step 1: 填充产品服务 HTML**

替换 `index.html` 中的 `<section id="services" class="section"></section>` 为：

```html
<section id="services" class="section">
    <div class="container">
        <h2 class="section-title fade-in">产品与服务</h2>
        <div class="services-grid">
            <div class="service-card fade-in">
                <div class="service-icon">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" stroke-width="2.5"/>
                        <line x1="4" y1="36" x2="20" y2="42" stroke="currentColor" stroke-width="2.5"/>
                        <line x1="44" y1="36" x2="28" y2="42" stroke="currentColor" stroke-width="2.5"/>
                        <path d="M18 20L22 26L30 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>软件开发与IT服务</h3>
                <p>提供企业级定制软件开发、系统集成、技术咨询等全方位 IT 服务，覆盖 Web、移动端、后端架构等技术领域。</p>
            </div>
            <div class="service-card fade-in">
                <div class="service-icon">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.5"/>
                        <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.3"/>
                        <path d="M24 6V12M24 36V42M6 24H12M36 24H42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        <path d="M11.5 11.5L15.7 15.7M32.3 32.3L36.5 36.5M11.5 36.5L15.7 32.3M32.3 15.7L36.5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <h3>AI 智能解决方案</h3>
                <p>基于大模型、机器学习与计算机视觉技术，为企业提供智能客服、数据分析、流程自动化等 AI 应用落地方案。</p>
            </div>
            <div class="service-card fade-in">
                <div class="service-icon">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" stroke-width="2.5"/>
                        <path d="M6 18H42" stroke="currentColor" stroke-width="2.5"/>
                        <circle cx="12" cy="14" r="1.5" fill="currentColor"/>
                        <circle cx="18" cy="14" r="1.5" fill="currentColor"/>
                        <circle cx="24" cy="14" r="1.5" fill="currentColor"/>
                        <rect x="12" y="24" width="10" height="8" rx="1" stroke="currentColor" stroke-width="2"/>
                        <line x1="28" y1="24" x2="36" y2="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <line x1="28" y1="28" x2="34" y2="28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <line x1="28" y1="32" x2="36" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <h3>企业 SaaS 平台</h3>
                <p>自主研发的企业级 SaaS 产品，涵盖项目管理、协同办公、业务流程数字化等场景，助力企业降本增效。</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: 添加服务卡片 CSS**

在 `css/style.css` 中添加：

```css
/* === Services === */
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.service-card {
    background: #fff;
    border-radius: 12px;
    padding: 40px 30px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    border: 1px solid var(--color-border);
}

.service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
}

.service-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    background: var(--gradient);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.service-icon svg {
    width: 36px;
    height: 36px;
}

.service-card h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
}

.service-card p {
    color: var(--color-text-light);
    font-size: 0.95rem;
    line-height: 1.7;
}

@media (max-width: 768px) {
    .services-grid {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

- [ ] **Step 3: 验证服务板块**

确认：三列卡片、图标渐变背景、hover 上浮效果、响应式排列。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add services section with three service cards"
```

---

### Task 5: 案例展示板块

**Files:**
- Modify: `index.html` — 替换 `<section id="cases">` 内容
- Modify: `css/style.css` — 添加案例卡片样式

- [ ] **Step 1: 填充案例展示 HTML**

替换 `index.html` 中的 `<section id="cases" class="section"></section>` 为：

```html
<section id="cases" class="section">
    <div class="container">
        <h2 class="section-title fade-in">案例展示</h2>
        <div class="cases-grid">
            <div class="case-card fade-in">
                <div class="case-cover" style="background: linear-gradient(135deg, #667eea, #764ba2);"></div>
                <div class="case-body">
                    <h3>某大型制造企业 ERP 系统</h3>
                    <p>为客户定制开发全流程 ERP 管理系统，实现生产、采购、库存、财务一体化管理。</p>
                </div>
            </div>
            <div class="case-card fade-in">
                <div class="case-cover" style="background: linear-gradient(135deg, #f093fb, #f5576c);"></div>
                <div class="case-body">
                    <h3>智能客服对话平台</h3>
                    <p>基于大语言模型打造智能客服系统，日均处理对话超万次，客户满意度提升 40%。</p>
                </div>
            </div>
            <div class="case-card fade-in">
                <div class="case-cover" style="background: linear-gradient(135deg, #4facfe, #00f2fe);"></div>
                <div class="case-body">
                    <h3>企业协同办公 SaaS 平台</h3>
                    <p>为中小企业提供项目管理、审批流程、即时通讯等一站式协同办公解决方案。</p>
                </div>
            </div>
            <div class="case-card fade-in">
                <div class="case-cover" style="background: linear-gradient(135deg, #43e97b, #38f9d7);"></div>
                <div class="case-body">
                    <h3>供应链数据分析平台</h3>
                    <p>利用 AI 算法优化供应链预测与调度，帮助客户降低库存成本 25%。</p>
                </div>
            </div>
            <div class="case-card fade-in">
                <div class="case-cover" style="background: linear-gradient(135deg, #fa709a, #fee140);"></div>
                <div class="case-body">
                    <h3>在线教育直播系统</h3>
                    <p>支持万人同时在线的直播教学平台，集成互动白板、实时答题等功能。</p>
                </div>
            </div>
            <div class="case-card fade-in">
                <div class="case-cover" style="background: linear-gradient(135deg, #a18cd1, #fbc2eb);"></div>
                <div class="case-body">
                    <h3>智慧园区管理系统</h3>
                    <p>融合 IoT 与 AI 技术的智慧园区方案，实现能耗监控、安防预警、设备运维一体化。</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: 添加案例 CSS**

在 `css/style.css` 中添加：

```css
/* === Cases === */
.cases-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.case-card {
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    border: 1px solid var(--color-border);
    transition: transform 0.3s, box-shadow 0.3s;
}

.case-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.case-cover {
    height: 180px;
}

.case-body {
    padding: 24px;
}

.case-body h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.case-body p {
    color: var(--color-text-light);
    font-size: 0.9rem;
    line-height: 1.7;
}

@media (max-width: 768px) {
    .cases-grid {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .cases-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

- [ ] **Step 3: 验证案例板块**

确认：6 张卡片网格、彩色渐变封面、hover 效果、响应式列数。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add cases section with six showcase cards"
```

---

### Task 6: 新闻动态板块

**Files:**
- Modify: `index.html` — 替换 `<section id="news">` 内容
- Modify: `css/style.css` — 添加新闻列表样式

- [ ] **Step 1: 填充新闻动态 HTML**

替换 `index.html` 中的 `<section id="news" class="section"></section>` 为：

```html
<section id="news" class="section">
    <div class="container">
        <h2 class="section-title fade-in">新闻动态</h2>
        <div class="news-list">
            <article class="news-item fade-in">
                <div class="news-date">
                    <span class="news-day">28</span>
                    <span class="news-month">2026.03</span>
                </div>
                <div class="news-content">
                    <h3>知涵信息全新官网正式上线</h3>
                    <p>上海知涵信息科技有限公司全新官方网站正式上线，以全新面貌展示公司业务与技术实力，为客户提供更便捷的信息获取渠道。</p>
                </div>
            </article>
            <article class="news-item fade-in">
                <div class="news-date">
                    <span class="news-day">15</span>
                    <span class="news-month">2026.02</span>
                </div>
                <div class="news-content">
                    <h3>公司 AI 智能客服产品获客户高度认可</h3>
                    <p>我司自研的 AI 智能客服解决方案在多家企业成功落地，客户满意度持续提升，日均对话处理量突破新高。</p>
                </div>
            </article>
            <article class="news-item fade-in">
                <div class="news-date">
                    <span class="news-day">08</span>
                    <span class="news-month">2026.01</span>
                </div>
                <div class="news-content">
                    <h3>知涵信息与多家企业达成战略合作</h3>
                    <p>新年伊始，公司与多家行业领先企业签署战略合作协议，共同推进数字化转型与智能化升级项目。</p>
                </div>
            </article>
            <article class="news-item fade-in">
                <div class="news-date">
                    <span class="news-day">20</span>
                    <span class="news-month">2025.12</span>
                </div>
                <div class="news-content">
                    <h3>年度技术分享会圆满举办</h3>
                    <p>公司成功举办 2025 年度技术分享大会，团队成员就 AI 大模型、云原生架构、SaaS 产品设计等热点议题展开深度交流。</p>
                </div>
            </article>
        </div>
    </div>
</section>
```

- [ ] **Step 2: 添加新闻列表 CSS**

在 `css/style.css` 中添加：

```css
/* === News === */
.news-list {
    max-width: 800px;
    margin: 0 auto;
}

.news-item {
    display: flex;
    gap: 30px;
    padding: 30px 0;
    border-bottom: 1px solid var(--color-border);
    transition: transform 0.3s;
}

.news-item:hover {
    transform: translateX(5px);
}

.news-item:last-child {
    border-bottom: none;
}

.news-date {
    flex-shrink: 0;
    width: 80px;
    text-align: center;
}

.news-day {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
}

.news-month {
    display: block;
    font-size: 0.85rem;
    color: var(--color-text-light);
    margin-top: 4px;
}

.news-content h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    transition: color 0.3s;
}

.news-item:hover .news-content h3 {
    color: var(--color-primary);
}

.news-content p {
    color: var(--color-text-light);
    font-size: 0.9rem;
    line-height: 1.7;
}

@media (max-width: 768px) {
    .news-item {
        flex-direction: column;
        gap: 10px;
    }

    .news-date {
        text-align: left;
        display: flex;
        align-items: baseline;
        gap: 8px;
    }

    .news-day {
        font-size: 1.5rem;
    }
}
```

- [ ] **Step 3: 验证新闻板块**

确认：日期+内容左右布局、hover 右移和标题变色、移动端堆叠。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add news section with four news items"
```

---

### Task 7: 联系我们 + 页脚

**Files:**
- Modify: `index.html` — 替换 `<section id="contact">` 和 `<footer>` 内容
- Modify: `css/style.css` — 添加联系和页脚样式

- [ ] **Step 1: 填充联系我们和页脚 HTML**

替换 `index.html` 中的 `<section id="contact" class="section"></section>` 为：

```html
<section id="contact" class="section">
    <div class="container">
        <h2 class="section-title fade-in">联系我们</h2>
        <div class="contact-grid fade-in">
            <div class="contact-info">
                <div class="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <div>
                        <h4>公司地址</h4>
                        <p>上海市（详细地址待更新）</p>
                    </div>
                </div>
                <div class="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    <div>
                        <h4>联系电话</h4>
                        <p>（电话待更新）</p>
                    </div>
                </div>
                <div class="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <div>
                        <h4>电子邮箱</h4>
                        <p>（邮箱待更新）</p>
                    </div>
                </div>
            </div>
            <form class="contact-form" id="contactForm">
                <input type="text" placeholder="您的姓名" required>
                <input type="tel" placeholder="联系电话" required>
                <textarea placeholder="请输入您的留言..." rows="5" required></textarea>
                <button type="submit">提交留言</button>
            </form>
        </div>
    </div>
</section>
```

替换 `<footer class="footer"></footer>` 为：

```html
<footer class="footer">
    <div class="container">
        <div class="footer-links">
            <a href="#hero">首页</a>
            <a href="#about">关于我们</a>
            <a href="#services">产品服务</a>
            <a href="#cases">案例展示</a>
            <a href="#news">新闻动态</a>
            <a href="#contact">联系我们</a>
        </div>
        <p class="footer-copy">&copy; 2026 上海知涵信息科技有限公司 <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">沪ICP备19039082号-3</a></p>
    </div>
</footer>
```

- [ ] **Step 2: 添加联系和页脚 CSS**

在 `css/style.css` 中添加：

```css
/* === Contact === */
.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
}

.contact-item {
    display: flex;
    gap: 16px;
    margin-bottom: 30px;
}

.contact-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: var(--color-primary);
    margin-top: 2px;
}

.contact-item h4 {
    font-size: 1rem;
    margin-bottom: 4px;
}

.contact-item p {
    color: var(--color-text-light);
    font-size: 0.95rem;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.contact-form input,
.contact-form textarea {
    padding: 14px 18px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: var(--font-family);
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
}

.contact-form input:focus,
.contact-form textarea:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.contact-form textarea {
    resize: vertical;
}

.contact-form button {
    padding: 14px;
    background: var(--gradient);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-family: var(--font-family);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.contact-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.contact-form button:disabled {
    opacity: 0.7;
    cursor: default;
    transform: none;
}

@media (max-width: 768px) {
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}

/* === Footer === */
.footer {
    background: var(--color-text);
    color: rgba(255, 255, 255, 0.7);
    padding: 40px 0;
    text-align: center;
}

.footer-links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 20px;
}

.footer-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: #fff;
}

.footer-copy {
    font-size: 0.85rem;
}

.footer-copy a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s;
}

.footer-copy a:hover {
    color: #fff;
}
```

- [ ] **Step 3: 验证联系和页脚板块**

确认：联系信息+表单双列布局、表单 focus 样式、提交按钮点击后显示"提交成功"、页脚备案号链接、响应式堆叠。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add contact section with form and footer with ICP filing"
```

---

### Task 8: 最终检查与优化

**Files:**
- Modify: `css/style.css` — 可能的微调
- Modify: `index.html` — 可能的微调

- [ ] **Step 1: 全页面浏览器测试**

在浏览器中完整测试：
- 桌面端（1200px+）：所有板块布局正确
- 平板端（768-1024px）：网格自适应
- 移动端（<768px）：汉堡菜单、单列堆叠、垂直时间线
- 导航锚点平滑滚动、活跃项高亮
- 滚动淡入动画正常触发
- 返回顶部按钮正常
- 表单提交提示正常

- [ ] **Step 2: 修复发现的问题（如有）**

根据测试结果修复问题。

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: final review and polish"
```
