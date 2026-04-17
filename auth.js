// Initialize Supabase
const supabaseUrl = 'https://qtewpjdnnjgvfgllgryy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZXdwamRubmpndmZnbGxncnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDgzMTksImV4cCI6MjA5MTM4NDMxOX0.SEjH2oD8nh-6Ff3yoDXlD93Ick9ZKf4_PD0lKWsSvDU';
const _authSupabase = supabase.createClient(supabaseUrl, supabaseKey);

async function updateNavigation() {
    const { data: { user } } = await _authSupabase.auth.getUser();
    
    // Select the navigation container
    const nav = document.querySelector('nav');
    if (!nav) return;

    if (user) {
        // Find existing buttons
        const loginLink = nav.querySelector('a[href*="login"]');
        const signupLink = nav.querySelector('a[href*="signup"]');
        
        // Hide them instead of removing to maintain layout
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';

        // Add Logout Button if it's not already there
        if (!document.getElementById('logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.innerText = 'Logout';
            
            // Applying classes to match your theme
            logoutBtn.className = 'bg-red-500 px-4 py-2 rounded-xl font-bold ml-4 hover:bg-red-600 transition-all text-white';
            
            logoutBtn.onclick = async () => {
                await _authSupabase.auth.signOut();
                window.location.href = "index.html";
            };
            
            nav.appendChild(logoutBtn);
        }
    }
}

// Run when the page is fully loaded
document.addEventListener('DOMContentLoaded', updateNavigation);
