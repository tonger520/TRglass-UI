/* ============================================
   GlassUI - 交互逻辑
   ============================================ */

const UI = {
    // 主题管理
    theme: {
        init() {
            const saved = localStorage.getItem('theme') || 'dark';
            this.set(saved);
        },
        toggle() {
            const current = document.documentElement.getAttribute('data-theme');
            this.set(current === 'dark' ? 'light' : 'dark');
        },
        set(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    },

    // 模态框
    modal: {
        open(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        },
        close(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        },
        closeAll() {
            document.querySelectorAll('.modal-overlay.active').forEach(m => {
                m.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    },

    // 通知
    toast: {
        container: null,

        init() {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        },

        show(options) {
            if (!this.container) this.init();

            const { type = 'info', title, message, duration = 3000 } = options;

            const icons = {
                success: '✓',
                error: '✕',
                warning: '!',
                info: 'i'
            };

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <div class="toast-icon">${icons[type]}</div>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    ${message ? `<div class="toast-message">${message}</div>` : ''}
                </div>
                <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
            `;

            this.container.appendChild(toast);

            if (duration > 0) {
                setTimeout(() => {
                    toast.classList.add('removing');
                    setTimeout(() => toast.remove(), 300);
                }, duration);
            }

            return toast;
        },

        success(title, message) {
            return this.show({ type: 'success', title, message });
        },
        error(title, message) {
            return this.show({ type: 'error', title, message });
        },
        warning(title, message) {
            return this.show({ type: 'warning', title, message });
        },
        info(title, message) {
            return this.show({ type: 'info', title, message });
        }
    },

    // 滚动检测
    scroll: {
        init() {
            const navbar = document.querySelector('.glass-navbar');
            if (!navbar) return;

            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 10);
            });
        }
    },

    // 移动端菜单
    navbar: {
        init() {
            const toggle = document.querySelector('.navbar-toggle');
            const links = document.querySelector('.navbar-links');
            if (!toggle || !links) return;

            toggle.addEventListener('click', () => {
                links.classList.toggle('show');
            });

            // 点击链接后关闭菜单
            links.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    links.classList.remove('show');
                });
            });
        }
    },

    // 侧边栏折叠
    sidebar: {
        init() {
            document.querySelectorAll('.sidebar-section-title').forEach(title => {
                title.addEventListener('click', () => {
                    title.parentElement.classList.toggle('collapsed');
                });
            });
        }
    },

    // 下拉菜单
    dropdown: {
        init() {
            document.querySelectorAll('[data-dropdown]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const menu = document.getElementById(trigger.dataset.dropdown);
                    if (menu) {
                        menu.classList.toggle('show');
                    }
                });
            });

            document.addEventListener('click', () => {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            });
        }
    },

    // 表单验证
    form: {
        init() {
            document.querySelectorAll('form[data-validate]').forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!this.validate(form)) {
                        e.preventDefault();
                    }
                });
            });
        },

        validate(form) {
            let valid = true;
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                    const error = input.nextElementSibling;
                    if (error && error.classList.contains('form-error')) {
                        error.textContent = '此字段为必填项';
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            return valid;
        }
    },

    // 鼠标跟踪光晕效果
    mouseGlow: {
        init() {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                document.documentElement.style.setProperty('--mouse-x', `${x}%`);
                document.documentElement.style.setProperty('--mouse-y', `${y}%`);
            });
        }
    },

    // 卡片倾斜效果（requestAnimationFrame 防抖）
    cardTilt: {
        init() {
            document.querySelectorAll('.glass-card').forEach(card => {
                let rafId = null;
                let targetTransform = '';

                const applyTransform = () => {
                    card.style.transform = targetTransform;
                    rafId = null;
                };

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 30;
                    const rotateY = (centerX - x) / 30;

                    targetTransform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;

                    if (!rafId) {
                        rafId = requestAnimationFrame(applyTransform);
                    }
                });

                card.addEventListener('mouseleave', () => {
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                    card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.transform = '';
                    card.addEventListener('transitionend', function handler() {
                        card.style.transition = '';
                        card.removeEventListener('transitionend', handler);
                    });
                });
            });
        }
    },

    // 初始化所有组件
    init() {
        this.theme.init();
        this.scroll.init();
        this.navbar.init();
        this.sidebar.init();
        this.dropdown.init();
        this.form.init();
        this.mouseGlow.init();
        this.cardTilt.init();
    }
};

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => UI.init());
