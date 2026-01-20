// --- Global Navigation & Utility JS ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const burgerCheckbox = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burgerCheckbox && mobileMenu) {
        burgerCheckbox.addEventListener('change', () => {
            if (burgerCheckbox.checked) {
                mobileMenu.classList.remove('hidden');
                // Force reflow for transition
                void mobileMenu.offsetWidth;
                mobileMenu.classList.add('active');
            } else {
                mobileMenu.classList.remove('active');
                // Wait for transition to end before hiding
                setTimeout(() => {
                    if (!burgerCheckbox.checked) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 300);
            }
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerCheckbox.checked = false;
                mobileMenu.classList.remove('active');
                setTimeout(() => {
                    if (!burgerCheckbox.checked) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 300);
            });
        });
    }

    // 2. Dark Mode Toggle (Desktop and Mobile)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');

    // Default to dark mode if no preference is set
    const isDarkMode = localStorage.getItem('theme') === 'dark' || !('theme' in localStorage);

    // Initial setting based on preference
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        updateDarkModeIcon(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateDarkModeIcon(false);
    }

    // Function to update the icon
    function updateDarkModeIcon(isDark) {
        const desktopIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;
        const mobileIcon = mobileDarkModeToggle ? mobileDarkModeToggle.querySelector('i') : null;

        if (isDark) {
            if (desktopIcon) { desktopIcon.classList.replace('fa-moon', 'fa-sun'); }
            if (mobileIcon) { mobileIcon.classList.replace('fa-moon', 'fa-sun'); }
        } else {
            if (desktopIcon) { desktopIcon.classList.replace('fa-sun', 'fa-moon'); }
            if (mobileIcon) { mobileIcon.classList.replace('fa-sun', 'fa-moon'); }
        }
    }

    // Toggle logic
    const toggleDarkMode = () => {
        const isCurrentlyDark = document.documentElement.classList.toggle('dark');

        if (isCurrentlyDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        updateDarkModeIcon(isCurrentlyDark);

        // Refresh chart to match theme colors
        updateFeatureStats();
    };

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // 3. Language Switcher - Exposed Globally
    window.translations = {
        en: {
            // Navbar & Footer
            nav_home: "Home",
            nav_view_issues: "View Issues",
            nav_report_issue: "Report Issue",
            nav_about: "About Us",
            nav_contact: "Contact",
            nav_select_lang: "Select Language",
            nav_toggle_theme: "Toggle Theme",
            footer_text: "© 2025 CrowdSolve. All rights reserved. | Empowering Civic Action.",

            // Home Page (index.html)
            hero_title_1: "CrowdSolve –",
            hero_title_2: "Civic Issue",
            hero_title_3: "Reporting Platform",
            hero_subtitle: "Empowering citizens to **report issues** and **track solutions** in their local communities.",
            btn_report: "Report Issue",
            btn_view: "View Issues",
            features_title: "Key Features",
            feat_1_title: "Report Issues with Photos",
            feat_1_desc: "Submit visual evidence to ensure clear communication of the problem.",
            feat_2_title: "Location-based Reports",
            feat_2_desc: "Pinpoint the exact location of the issue on an interactive map.",
            feat_3_title: "Track Issue Status",
            feat_3_desc: "Monitor progress from Pending to In Progress to fully Resolved.",
            feat_4_title: "Real-time Notifications",
            feat_4_desc: "Get alerts when the status of an issue you follow changes.",
            stat_total: "Total Reports:",
            stat_active: "Active Issues:",
            stat_resolved: "Resolved:",
            stat_users: "Community Users:",
            testimonials_title: "What People Are Saying",
            testimonial_1: "\"CrowdSolve made it so easy to report the massive pothole on my street. Within a week, the status changed to 'Resolved' and the road was fixed! This platform truly works.\"",
            testimonial_1_role: "Local Resident, Verified User",
            testimonial_2: "\"As a city official, CrowdSolve helps us prioritize issues based on community reports. It's an invaluable tool for improving our response times!\"",
            testimonial_2_role: "Municipal Officer",
            testimonial_3: "\"I reported a broken streetlight and it was fixed in 3 days! The real-time updates kept me informed throughout. Great initiative!\"",
            testimonial_3_role: "Community Member",

            // Issues Page (issues.html)
            issues_title: "Community Issues Tracker",
            search_placeholder: "Search issues by title or description...",
            filter_cat_all: "All Categories",
            filter_cat_roads: "Roads",
            filter_cat_garbage: "Garbage",
            filter_cat_electricity: "Electricity",
            filter_cat_water: "Water",
            filter_cat_safety: "Public Safety",
            filter_status_all: "All Statuses",
            filter_status_pending: "Pending",
            filter_status_progress: "In Progress",
            filter_status_resolved: "Resolved",
            filter_priority_all: "All Priorities",
            filter_priority_high: "High",
            filter_priority_medium: "Medium",
            label_desc: "Detailed Description",
            label_upload: "Upload Image (Auto GeoTagged)",
            label_select_photo: "Select a photo",
            label_location: "Auto-detected Location",
            placeholder_location: "Fetching location...",
            placeholder_pincode: "Pin Code",
            btn_submit_report: "Submit Issue Report",
            msg_location_not_found: "Location not found. Please enter manually.",
            msg_address_not_found: "Address not found",
            msg_error_fetching: "Error fetching address",
            msg_issue_submitted: "Issue submitted successfully! Issue ID: ",

            // About Page (about.html)
            about_title: "About CrowdSolve",
            about_purpose_title: "Our Purpose",
            about_purpose_desc: "CrowdSolve is a **Civic Issue Reporting & Resolution System** built to bridge the communication gap between citizens and local authorities. We believe that an empowered, engaged community is the key to a better-maintained city. Our platform provides a simple, transparent, and efficient way for anyone to report common civic issues—from a broken streetlight to a major water leak.",
            about_mission_title: "Our Mission",
            about_mission_desc: "To create a transparent, user-friendly ecosystem where every reported civic issue is logged, tracked, and ultimately resolved with accountability and speed.",
            about_vision_title: "Our Vision",
            about_vision_desc: "To be the leading platform for community-driven urban maintenance, fostering a culture of collective responsibility and civic pride in every neighborhood.",
            about_team_title: "Our Team",
            about_team_members: "Team Members",
            btn_see_issues: "See Issues in Action",

            // Contact Page (contact.html)
            contact_title: "Get In Touch",
            label_name: "Your Name",
            placeholder_name: "Raju Rastogi",
            label_email: "Your Email",
            placeholder_email: "Raju@example.com",
            label_message: "Message",
            placeholder_message: "How can we help you?",
            btn_send_message: "Send Message",
            contact_support_text: "For immediate technical issues, please email us at",

            // Report Page (report.html)
            report_page_title: "Report a Civic Issue",
            label_title: "Issue Title",
            placeholder_title: "Enter issue title",
            label_category: "Category",
            select_cat_placeholder: "Select Category",
            placeholder_desc: "Describe the issue in detail",

            // Issues Page (issues.html)
            card_trending: "TRENDING",
            card_view_details: "View Details",
            btn_voted: "Voted!",
            btn_upvote: "Upvote Issue",
            chart_status_title: "Issue Status Overview",
            chart_category_title: "Category Distribution",
            no_issues_msg: "No issues match the current filters.",
            no_issues_sub: "Try adjusting your category or status selection.",
            label_priority: "Priority",

            // Details Page (details.html)
            issue_desc_title: "Issue Description",
            status_timeline_title: "Status Timeline",
            timeline_assigned: "Assigned & Inspection Complete",
            timeline_reported: "Reported",
            status_action_title: "Status & Action",
            current_status_label: "Current Status",
            community_impact_label: "Community Impact",
            votes_label: "Votes",
            location_label: "Location",
            map_placeholder: "Map View Placeholder",
            upvotes_suffix: "Upvotes",
            msg_vote_success: "You have successfully upvoted this issue! Your support matters.",
            msg_already_voted: "You have already upvoted this issue.",
            msg_report_success: "🚀 Issue Reported Successfully! Our team will review and update the status soon.",
            msg_issue_submitted: "Issue submitted successfully! Issue ID: ",
            msg_contact_success: "📬 Message sent successfully! We will get back to you within 48 hours.",

            // AI Assistant
            ai_greeting: "Hello! 👋 I'm your Smart City Assistant. How can I help you today?",
            ai_fab_label: "How can I help you?",
            ai_header_title: "Smart AI Assistant",
            ai_header_subtitle: "Citizens' Hub Support",
            ai_opt_report: "Report an Issue",
            ai_opt_track: "Track an Issue",
            ai_opt_explain: "How it works?",
            ai_opt_contact: "Contact Us",
            ai_opt_yes_report: "Yes, take me there",
            ai_opt_how_report: "How do I report?",
            ai_opt_back: "Back",
            ai_opt_yes_track: "Yes, show issues",
            ai_opt_how_track: "How to track?",
            ai_opt_report_now: "Report Now",
            ai_opt_got_it: "Got it!",
            ai_opt_back_menu: "Back to Menu",
            ai_opt_start_over: "Start Over",
            ai_msg_report_intro: "I can help you report a civic issue! It's a simple process. Would you like to go to the reporting page now?",
            ai_msg_track_intro: "You can track the status of any reported issue on our 'View Issues' page. Should I take you there?",
            ai_msg_explain_intro: "Here is how CrowdSolve works:",
            ai_msg_contact_intro: "You can reach out to our team via the Contact page. Would you like to go there now?",
            ai_opt_yes_contact: "Yes, take me there",
            ai_msg_error: "I'm sorry, I didn't quite catch that. Would you like to start over?",
            ai_msg_report_steps: "To report an issue:\n1. Click 'Report Issue'\n2. Take a photo of the problem\n3. Our app will automatically tag the location!\n4. Add a description and submit.",
            ai_msg_track_steps: "In the 'View Issues' page, you can see real-time updates: \n- Pending: Received\n- In Progress: Team assigned\n- Resolved: Fixed!",
            ai_msg_explain_steps: "📸 **Step 1: Report an Issue**\nTake a photo of a problem and upload it. No long forms!\n\n📍 **Step 2: Auto Location Detection**\nYour location is automatically captured using GPS.\n\n🤝 **Step 3: Community Verification**\nCitizens nearby can verify and vote.\n\n🏛 **Step 4: Authority Action**\nAuthorities see most-voted issues first.\n\n📷 **Step 5: Verified Resolution**\nOfficials upload a closing photo from the same location."
        },
        hi: {
            // Navbar & Footer
            nav_home: "होम",
            nav_view_issues: "समस्याएं देखें",
            nav_report_issue: "समस्या रिपोर्ट करें",
            nav_about: "हमारे बारे में",
            nav_contact: "संपर्क करें",
            nav_select_lang: "भाषा चुनें",
            nav_toggle_theme: "थीम बदलें",
            footer_text: "© 2025 CrowdSolve. सर्वाधिकार सुरक्षित। | नागरिक कार्रवाई को सशक्त बनाना।",

            // Home Page (index.html)
            hero_title_1: "क्राउडसॉल्व –",
            hero_title_2: "नागरिक समस्या",
            hero_title_3: "रिपोर्टिंग प्लेटफॉर्म",
            hero_subtitle: "नागरिकों को अपने स्थानीय समुदायों में **समस्याओं की रिपोर्ट करने** और **समाधान ट्रैक करने** के लिए सशक्त बनाना।",
            btn_report: "समस्या रिपोर्ट करें",
            btn_view: "समस्याएं देखें",
            features_title: "मुख्य विशेषताएं",
            feat_1_title: "फोटो के साथ समस्याएं रिपोर्ट करें",
            feat_1_desc: "समस्या का स्पष्ट संचार सुनिश्चित करने के लिए दृश्य प्रमाण जमा करें।",
            feat_2_title: "स्थान-आधारित रिपोर्ट",
            feat_2_desc: "इंटरेक्टिव मानचित्र पर समस्या के सटीक स्थान को इंगित करें।",
            feat_3_title: "समस्या की स्थिति ट्रैक करें",
            feat_3_desc: "लंबित से प्रगति में और पूरी तरह से हल होने तक प्रगति की निगरानी करें।",
            feat_4_title: "वास्तविक समय की सूचनाएं",
            feat_4_desc: "जब आपके द्वारा फॉलो की जाने वाली समस्या की स्थिति बदलती है तो अलर्ट प्राप्त करें।",
            stat_total: "कुल रिपोर्ट:",
            stat_active: "सक्रिय समस्याएं:",
            stat_resolved: "हल की गई:",
            stat_users: "समुदाय उपयोगकर्ता:",
            testimonials_title: "लोग क्या कह रहे हैं",
            testimonial_1: "\"क्राउडसॉल्व ने मेरी सड़क पर बड़े गड्ढे की रिपोर्ट करना इतना आसान बना दिया। एक सप्ताह के भीतर, स्थिति 'हल' हो गई और सड़क ठीक हो गई! यह मंच वास्तव में काम करता है।\"",
            testimonial_1_role: "स्थानीय निवासी, सत्यापित उपयोगकर्ता",
            testimonial_2: "\"नगर निगम अधिकारी के रूप में, क्राउडसॉल्व हमें सामुदायिक रिपोर्टों के आधार पर समस्याओं को प्राथमिकता देने में मदद करता है। यह हमारी प्रतिक्रिया समय में सुधार के लिए एक अमूल्य उपकरण है!\"",
            testimonial_2_role: "नगर निगम अधिकारी",
            testimonial_3: "\"मैंने एक खराब स्ट्रीटलाइट की रिपोर्ट की और इसे 3 दिनों में ठीक कर दिया गया! वास्तविक समय के अपडेट ने मुझे पूरी जानकारी दी। शानदार पहल!\"",
            testimonial_3_role: "समुदाय सदस्य",

            // Issues Page (issues.html)
            issues_title: "सामुदायिक समस्या ट्रैकर",
            search_placeholder: "शीर्षक या विवरण द्वारा समस्याएं खोजें...",
            filter_cat_all: "सभी श्रेणियां",
            filter_cat_roads: "सड़कें",
            filter_cat_garbage: "कचरा",
            filter_cat_electricity: "बिजली",
            filter_cat_water: "पानी",
            filter_cat_safety: "सार्वजनिक सुरक्षा",
            filter_status_all: "सभी स्थितियां",
            filter_status_pending: "लंबित",
            filter_status_progress: "प्रगति में",
            filter_status_resolved: "हल किया गया",
            filter_priority_all: "सभी प्राथमिकताएं",
            filter_priority_high: "उच्च",
            filter_priority_medium: "मध्यम",
            label_desc: "विस्तृत विवरण",
            label_upload: "छवि अपलोड करें (ऑटो जियोटैग)",
            label_select_photo: "एक फोटो चुनें",
            label_location: "स्वतः पता लगाया गया स्थान",
            placeholder_location: "स्थान प्राप्त किया जा रहा है...",
            placeholder_pincode: "पिन कोड",
            btn_submit_report: "समस्या रिपोर्ट जमा करें",
            msg_location_not_found: "स्थान नहीं मिला। कृपया मैन्युअल रूप से दर्ज करें।",
            msg_address_not_found: "पता नहीं मिला",
            msg_error_fetching: "पता लाने में त्रुटि",
            msg_issue_submitted: "समस्या सफलतापूर्वक जमा की गई! समस्या आईडी: ",

            // About Page (about.html)
            about_title: "क्राउडसॉल्व के बारे में",
            about_purpose_title: "हमारा उद्देश्य",
            about_purpose_desc: "क्राउडसॉल्व एक **नागरिक समस्या रिपोर्टिंग और समाधान प्रणाली** है जिसे नागरिकों और स्थानीय अधिकारियों के बीच संचार अंतर को पाटने के लिए बनाया गया है। हमारा मानना है कि एक सशक्त, व्यस्त समुदाय बेहतर रखरखाव वाले शहर की कुंजी है। हमारा मंच किसी के लिए भी सामान्य नागरिक समस्याओं की रिपोर्ट करने का एक सरल, पारदर्शी और कुशल तरीका प्रदान करता है - टूटी हुई स्ट्रीटलाइट से लेकर बड़े पानी के रिसाव तक।",
            about_mission_title: "हमारा मिशन",
            about_mission_desc: "एक पारदर्शी, उपयोगकर्ता के अनुकूल पारिस्थितिकी तंत्र बनाना जहां प्रत्येक रिपोर्ट की गई नागरिक समस्या को लॉग किया जाता है, ट्रैक किया जाता है, और अंततः जवाबदेही और गति के साथ हल किया जाता है।",
            about_vision_title: "हमारा विजन",
            about_vision_desc: "सामुदायिक संचालित शहरी रखरखाव के लिए अग्रणी मंच बनना, हर पड़ोस में सामूहिक जिम्मेदारी और नागरिक गौरव की संस्कृति को बढ़ावा देना।",
            about_team_title: "हमारी टीम",
            about_team_members: "टीम के सदस्य",
            btn_see_issues: "कार्रवाई में समस्याएं देखें",

            // Contact Page (contact.html)
            contact_title: "संपर्क करें",
            label_name: "आपका नाम",
            placeholder_name: "राजू रस्तोगी",
            label_email: "आपका ईमेल",
            placeholder_email: "Raju@example.com",
            label_message: "संदेश",
            placeholder_message: "हम आपकी कैसे मदद कर सकते हैं?",
            btn_send_message: "संदेश भेजें",
            contact_support_text: "तत्काल तकनीकी समस्याओं के लिए, कृपया हमें ईमेल करें",

            // Report Page (report.html)
            report_page_title: "नागरिक समस्या रिपोर्ट करें",
            label_title: "समस्या का शीर्षक",
            placeholder_title: "समस्या का शीर्षक दर्ज करें",
            label_category: "श्रेणी",
            select_cat_placeholder: "श्रेणी चुनें",
            placeholder_desc: "समस्या का विस्तार से वर्णन करें",

            // Issues Page (issues.html)
            card_trending: "ट्रेंडिंग",
            card_view_details: "विवरण देखें",
            btn_voted: "वोट दिया!",
            btn_upvote: "समस्या को वोट दें",
            chart_status_title: "समस्या की स्थिति का अवलोकन",
            chart_category_title: "श्रेणी वितरण",
            no_issues_msg: "वर्तमान फ़िल्टर से कोई समस्या मेल नहीं खाती।",
            no_issues_sub: "अपनी श्रेणी या स्थिति चयन को समायोजित करने का प्रयास करें।",
            label_priority: "प्राथमिकता",

            // Details Page (details.html)
            issue_desc_title: "समस्या का विवरण",
            status_timeline_title: "स्थिति समयरेखा",
            timeline_assigned: "सौंपा गया और निरीक्षण पूर्ण",
            timeline_reported: "रिपोर्ट किया गया",
            status_action_title: "स्थिति और कार्रवाई",
            current_status_label: "वर्तमान स्थिति",
            community_impact_label: "सामुदायिक प्रभाव",
            votes_label: "वोट",
            location_label: "स्थान",
            map_placeholder: "मानचित्र दृश्य प्लेसहोल्डर",
            upvotes_suffix: "वोट",
            msg_vote_success: "आपने इस समस्या को सफलतापूर्वक वोट दिया है! आपका समर्थन मायने रखता है।",
            msg_already_voted: "आपने पहले ही इस समस्या को वोट दे दिया है।",
            msg_report_success: "🚀 समस्या सफलतापूर्वक रिपोर्ट की गई! हमारी टीम जल्द ही समीक्षा करेगी और स्थिति अपडेट करेगी।",
            msg_issue_submitted: "समस्या सफलतापूर्वक सबमिट की गई! समस्या आईडी: ",
            msg_contact_success: "📬 संदेश सफलतापूर्वक भेजा गया! हम 48 घंटों के भीतर आपसे संपर्क करेंगे।",

            // AI Assistant
            ai_greeting: "नमस्ते! 👋 मैं आपका स्मार्ट सिटी सहायक हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
            ai_fab_label: "मैं आपकी कैसे मदद कर सकता हूँ?",
            ai_header_title: "स्मार्ट एआई सहायक",
            ai_header_subtitle: "नागरिक हब सहायता",
            ai_opt_report: "समस्या रिपोर्ट करें",
            ai_opt_track: "समस्या ट्रैक करें",
            ai_opt_explain: "यह कैसे काम करता है?",
            ai_opt_contact: "संपर्क करें",
            ai_opt_yes_report: "हाँ, मुझे वहां ले जाएं",
            ai_opt_how_report: "मैं रिपोर्ट कैसे करूं?",
            ai_opt_back: "पीछे",
            ai_opt_yes_track: "हाँ, समस्याएं दिखाएं",
            ai_opt_how_track: "ट्रैक कैसे करें?",
            ai_opt_report_now: "अभी रिपोर्ट करें",
            ai_opt_got_it: "समझ गया!",
            ai_opt_back_menu: "मेन्यू पर वापस",
            ai_opt_start_over: "फिर से शुरू करें",
            ai_msg_report_intro: "मैं आपको नागरिक समस्या की रिपोर्ट करने में मदद कर सकता हूँ! यह एक सरल प्रक्रिया है। क्या आप अभी रिपोर्टिंग पेज पर जाना चाहेंगे?",
            ai_msg_track_intro: "आप हमारे 'समस्याएं देखें' पेज पर किसी भी रिपोर्ट की गई समस्या की स्थिति ट्रैक कर सकते हैं। क्या मैं आपको वहां ले जाऊं?",
            ai_msg_explain_intro: "यहाँ बताया गया है कि क्राउडसॉल्व कैसे काम करता है:",
            ai_msg_contact_intro: "आप संपर्क पृष्ठ के माध्यम से हमारी टीम से संपर्क कर सकते हैं। क्या आप वहां जाना चाहेंगे?",
            ai_opt_yes_contact: "हाँ, मुझे वहां ले जाएं",
            ai_msg_error: "क्षमा करें, मैं समझ नहीं पाया। क्या आप फिर से शुरू करना चाहेंगे?",
            ai_msg_report_steps: "समस्या की रिपोर्ट करने के लिए:\n1. 'समस्या रिपोर्ट करें' पर क्लिक करें\n2. समस्या की एक फोटो लें\n3. हमारा ऐप अपने आप स्थान टैग कर देगा!\n4. विवरण जोड़ें और सबमिट करें।",
            ai_msg_track_steps: "'समस्याएं देखें' पेज में, आप रीयल-टाइम अपडेट देख सकते हैं: \n- लंबित: प्राप्त हुआ\n- प्रगति में: टीम नियुक्त\n- हल: ठीक हो गया!",
            ai_msg_explain_steps: "📸 **चरण 1: समस्या की रिपोर्ट करें**\nसमस्या की फोटो लें और अपलोड करें। कोई लंबे फॉर्म नहीं!\n\n📍 **चरण 2: ऑटो लोकेशन डिटेक्शन**\nGPS का उपयोग करके आपकी लोकेशन अपने आप कैप्चर हो जाती है।\n\n🤝 **चरण 3: सामुदायिक सत्यापन**\nआस-पास के नागरिक सत्यापित कर सकते हैं और वोट दे सकते हैं।\n\n🏛 **चरण 4: प्राधिकरण कार्रवाई**\nअधिकारी सबसे अधिक वोट वाली समस्याओं को पहले देखते हैं।\n\n📷 **चरण 5: सत्यापित समाधान**\nअधिकारी उसी स्थान से क्लोजिंग फोटो अपलोड करते हैं।"
        },
        mr: {
            // Navbar & Footer
            nav_home: "मुख्य पृष्ठ",
            nav_view_issues: "समस्या पाहा",
            nav_report_issue: "तक्रार करा",
            nav_about: "आमच्याबद्दल",
            nav_contact: "संपर्क",
            nav_select_lang: "भाषा निवडा",
            nav_toggle_theme: "थीम बदला",
            footer_text: "© 2025 CrowdSolve. सर्व हक्क राखीव. | नागरी कृतीस सक्षम करणे.",

            // Home Page
            hero_title_1: "क्राउडसॉल्व –",
            hero_title_2: "नागरी समस्या",
            hero_title_3: "निवारण मंच",
            hero_subtitle: "नागरिकांना त्यांच्या स्थानिक समुदायातील **समस्या नोंदवण्यास** आणि **समाधान ट्रॅक करण्यास** सक्षम करणे.",
            btn_report: "तक्रार नोंदवा",
            btn_view: "समस्या पाहा",
            features_title: "प्रमुख वैशिष्ट्ये",
            feat_1_title: "फोटोसह तक्रार करा",
            feat_1_desc: "समस्येची स्पष्ट माहिती देण्यासाठी फोटो अपलोड करा.",
            feat_2_title: "स्थान-आधारित अहवाल",
            feat_2_desc: "नकाशावर समस्येचे नेमके ठिकाण दर्शवा.",
            feat_3_title: "तक्रार स्थिती जाणून घ्या",
            feat_3_desc: "प्रलंबित ते निराकरण होईपर्यंतच्या प्रगतीवर लक्ष ठेवा.",
            feat_4_title: "रिअल-टाइम सूचना",
            feat_4_desc: "तुम्ही फॉलो केलेल्या समस्येची स्थिती बदलल्यास अलर्ट मिळवा.",
            stat_total: "एकूण तक्रारी:",
            stat_active: "सक्रिय समस्या:",
            stat_resolved: "निराकरण झाले:",
            stat_users: "समुदाय वापरकर्ते:",
            testimonials_title: "लोक काय म्हणतात",
            testimonial_1: "\"क्राउडसॉल्वमुळे माझ्या रस्त्यावरील मोठ्या खड्ड्याची तक्रार करणे खूप सोपे झाले. आठवड्याभरात स्थिती 'निराकरण' झाली आणि रस्ता दुरुस्त झाला! हे व्यासपीठ खरोखर काम करते.\"",
            testimonial_1_role: "स्थानिक रहिवासी, सत्यापित वापरकर्ता",
            testimonial_2: "\"नगरपालिका अधिकारी म्हणून, क्राउडसॉल्व्ह आम्हाला सामुदायिक अहवालांवर आधारित समस्यांना प्राधान्य देण्यास मदत करते. आमच्या प्रतिसादाचा वेळ सुधारण्यासाठी हे एक अमूल्य साधन आहे!\"",
            testimonial_2_role: "नगरपालिका अधिकारी",
            testimonial_3: "\"मी एका तुटलेल्या स्ट्रीटलाइटची तक्रार केली आणि ती 3 दिवसात दुरुस्त झाली! रिअल-टाइम अपडेट्समुळे मला संपूर्ण माहिती मिळाली. उत्तम उपक्रम!\"",
            testimonial_3_role: "समुदाय सदस्य",

            // Issues Page
            issues_title: "सामुदायिक समस्या ट्रॅकर",
            search_placeholder: "शीर्षक किंवा वर्णनाद्वारे शोधा...",
            filter_cat_all: "सर्व श्रेणी",
            filter_cat_roads: "रस्ते",
            filter_cat_garbage: "कचरा",
            filter_cat_electricity: "वीज",
            filter_cat_water: "पाणी",
            filter_cat_safety: "सार्वजनिक सुरक्षा",
            filter_status_all: "सर्व स्थिती",
            filter_status_pending: "प्रलंबित",
            filter_status_progress: "प्रगतीपथावर",
            filter_status_resolved: "निराकरण झाले",
            filter_priority_all: "सर्व प्राधान्ये",
            filter_priority_high: "उच्च",
            filter_priority_medium: "मध्यम",
            label_desc: "सविस्तर माहिती",
            label_upload: "फोटो अपलोड करा",
            label_select_photo: "फोटो निवडा",
            label_location: "आपोआप डिटेक्ट केलेले ठिकाण",
            placeholder_location: "ठिकाण शोधत आहे...",
            placeholder_pincode: "पिन कोड",
            btn_submit_report: "तक्रार जमा करा",
            msg_location_not_found: "ठिकाण सापडले नाही. कृपया मॅन्युअली टाका.",
            msg_address_not_found: "पत्ता सापडला नाही",
            msg_error_fetching: "पत्ता मिळवण्यात त्रुटी",
            msg_issue_submitted: "तक्रार यशस्वीरित्या जमा झाली! आयडी: ",

            // About Page
            about_title: "क्राउडसॉल्व बद्दल",
            about_purpose_title: "आमचा उद्देश",
            about_purpose_desc: "क्राउडसॉल्व ही एक **नागरी समस्या निवारण प्रणाली** आहे जी नागरिक आणि स्थानिक प्रशासन यांच्यातील दरी कमी करण्यासाठी बनवली आहे.",
            about_mission_title: "आमचे ध्येय",
            about_mission_desc: "एक पारदर्शक यंत्रणा तयार करणे जिथे प्रत्येक समस्येची दखल घेतली जाईल आणि वेगाने सोडवली जाईल.",
            about_vision_title: "आमची दृष्टी",
            about_vision_desc: "सामुदायिक सहभागातून शहरे स्वच्छ आणि सुंदर बनवणे.",
            about_team_title: "आमचा संघ",
            about_team_members: "संघ सदस्य",
            btn_see_issues: "समस्या पाहा",

            // Contact Page
            contact_title: "संपर्क साधा",
            label_name: "तुमचे नाव",
            placeholder_name: "राजू रस्तोगी",
            label_email: "तुमचा ईमेल",
            placeholder_email: "raju@example.com",
            label_message: "संदेश",
            placeholder_message: "आम्ही तुम्हाला कशी मदत करू शकतो?",
            btn_send_message: "संदेश पाठवा",
            contact_support_text: "तात्काळ तांत्रिक मदतीसाठी आम्हाला ईमेल करा",

            // Report Page (report.html)
            report_page_title: "नागरी तक्रार नोंदवा",
            label_title: "तक्रारीचे शीर्षक",
            placeholder_title: "तक्रारीचे शीर्षक टाका",
            label_category: "वर्ग",
            select_cat_placeholder: "श्रेणी निवडा",
            placeholder_desc: "समस्येचे सविस्तर वर्णन करा",

            // Issues Page (issues.html)
            card_trending: "ट्रेंडिंग",
            card_view_details: "तपशील पाहा",
            btn_voted: "मत दिले!",
            btn_upvote: "तक्रारीला मत द्या",
            chart_status_title: "तक्रार स्थिती विहंगावलोकन",
            chart_category_title: "श्रेणी वितरण",
            no_issues_msg: "सध्याच्या फिल्टरशी कोणतीही तक्रार जुळत नाही.",
            no_issues_sub: "तुमची श्रेणी किंवा स्थिती निवड बदलून पहा.",
            label_priority: "प्राधान्य",

            // Details Page (details.html)
            issue_desc_title: "तक्रार वर्णन",
            status_timeline_title: "स्थिती टाइमलाइन",
            timeline_assigned: "नियुक्त आणि तपासणी पूर्ण",
            timeline_reported: "नोंदवली",
            status_action_title: "स्थिती आणि कृती",
            current_status_label: "सध्याची स्थिती",
            community_impact_label: "सामुदायिक प्रभाव",
            votes_label: "मते",
            location_label: "ठिकाण",
            map_placeholder: "नकाशा दृश्य",
            upvotes_suffix: "मते",
            msg_vote_success: "तुम्ही या तक्रारीला यशस्वीरित्या मत दिले आहे! तुमचे समर्थन महत्वाचे आहे.",
            msg_already_voted: "तुम्ही आधीच या तक्रारीला मत दिले आहे।",
            msg_report_success: "🚀 तक्रार यशस्वीरित्या नोंदवली गेली! आमची टीम लवकरच पुनरावलोकन करेल आणि स्थिती अपडेट करेल.",
            msg_issue_submitted: "तक्रार यशस्वीरित्या सबमिट केली! तक्रार आयडी: ",
            msg_contact_success: "📬 संदेश यशस्वीरित्या पाठवला गेला! आम्ही ४८ तासांच्या आत तुमच्याशी संपर्क साधू।",

            // AI Assistant
            ai_greeting: "नमस्कार! 👋 मी तुमचा स्मार्ट सिटी सहाय्यक आहे. मी आज तुम्हाला कशी मदत करू शकतो?",
            ai_fab_label: "मी तुम्हाला कशी मदत करू शकतो?",
            ai_header_title: "स्मार्ट एआय सहाय्यक",
            ai_header_subtitle: "नागरिक हब समर्थन",
            ai_opt_report: "तक्रार नोंदवा",
            ai_opt_track: "तक्रार ट्रॅक करा",
            ai_opt_explain: "हे कसे काम करते?",
            ai_opt_contact: "संपर्क साधा",
            ai_opt_yes_report: "हो, मला तिथे घेऊन चला",
            ai_opt_how_report: "मी तक्रार कशी करू?",
            ai_opt_back: "मागे",
            ai_opt_yes_track: "हो, तक्रारी दाखवा",
            ai_opt_how_track: "ट्रॅक कसे करावे?",
            ai_opt_report_now: "आता तक्रार करा",
            ai_opt_got_it: "समजले!",
            ai_opt_back_menu: "मेनूवर परत",
            ai_opt_start_over: "पुन्हा सुरू करा",
            ai_msg_report_intro: "मी तुम्हाला नागरी तक्रार नोंदवण्यास मदत करू शकतो! ही एक सोपी प्रक्रिया आहे. तुम्ही आता तक्रार पृष्ठावर जाऊ इच्छिता का?",
            ai_msg_track_intro: "तुम्ही आमच्या 'तक्रार पहा' पृष्ठावर कोणत्याही नोंदवलेल्या तक्रारीची स्थिती ट्रॅक करू शकता. मी तुम्हाला तिथे नेऊ का?",
            ai_msg_explain_intro: "क्राउडसॉल्व कसे कार्य करते ते येथे आहे:",
            ai_msg_contact_intro: "तुम्ही संपर्क पृष्ठाद्वारे आमच्या टीमशी संपर्क साधू शकता. तुम्हाला तिथे जायला आवडेल का?",
            ai_opt_yes_contact: "हो, मला तिथे घेऊन चला",
            ai_msg_error: "क्षमस्व, मला ते नीट समजले नाही. तुम्हाला पुन्हा सुरू करायला आवडेल का?",
            ai_msg_report_steps: "तक्रार नोंदवण्यासाठी:\n1. 'तक्रार करा' वर क्लिक करा\n2. समस्येचा फोटो घ्या\n3. आमचे अ‍ॅप आपोआप ठिकाण टॅग करेल!\n4. वर्णन जोडा आणि सबमिट करा.",
            ai_msg_track_steps: "'तक्रारी पहा' पृष्ठावर, तुम्ही रिअल-टाइम अपडेट्स पाहू शकता: \n- प्रलंबित: प्राप्त झाले\n- प्रगतीपथावर: टीम नियुक्त केली\n- निराकरण: दुरुस्त केले!",
            ai_msg_explain_steps: "📸 **पायरी १: तक्रार नोंदवा**\nसमस्येचा फोटो घ्या आणि अपलोड करा. लांब फॉर्म नाही!\n\n📍 **पायरी २: ऑटो लोकेशन शोध**\nतुमचे स्थान GPS वापरून आपोआप कॅप्चर केले जाते.\n\n🤝 **पायरी ३: समुदाय पडताळणी**\nजवळपासचे नागरिक पडताळणी करू शकतात आणि मतदान करू शकतात.\n\n🏛 **पायरी ४: प्राधिकरण कारवाई**\nअधिकारी सर्वाधिक मतदान झालेल्या समस्या आधी पाहतात.\n\n📷 **पायरी ५: सत्यापित निराकरण**\nअधिकारी त्याच ठिकाणाहून क्लोजिंग फोटो अपलोड करतात।"
        },
        te: {
            // Navbar & Footer
            nav_home: "హోమ్",
            nav_view_issues: "సమస్యలు చూడండి",
            nav_report_issue: "ఫిర్యాదు చేయండి",
            nav_about: "మా గురించి",
            nav_contact: "సంప్రదించండి",
            nav_select_lang: "భాషను ఎంచుకోండి",
            nav_toggle_theme: "థీమ్‌ను మార్చండి",
            footer_text: "© 2025 CrowdSolve. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.",

            // Home Page
            hero_title_1: "క్రౌడ్‌సాల్వ్ –",
            hero_title_2: "పౌర సమస్యల",
            hero_title_3: "పరిష్కార వేదిక",
            hero_subtitle: "పౌరులు తమ ప్రాంతంలోని **సమస్యలను నివేదించడానికి** మరియు **పరిష్కారాలను ట్రాక్ చేయడానికి** సాధికారత.",
            btn_report: "ఫిర్యాదు చేయండి",
            btn_view: "సమస్యలు చూడండి",
            features_title: "ముఖ్య లక్షణాలు",
            feat_1_title: "ఫోటోలతో ఫిర్యాదు చేయండి",
            feat_1_desc: "సమస్యను స్పష్టంగా వివరించడానికి ఫోటోను అప్లోడ్ చేయండి.",
            feat_2_title: "లొకేషన్ ఆధారిత నివేదికలు",
            feat_2_desc: "మ్యాప్‌లో సమస్య ఉన్న ప్రదేశాన్ని గుర్తించండి.",
            feat_3_title: "స్థితిని ట్రాక్ చేయండి",
            feat_3_desc: "ఫిర్యాదు చేసినప్పటి నుండి పరిష్కారం వరకు పురోగతిని చూడండి.",
            feat_4_title: "రియల్ టైమ్ అలర్ట్స్",
            feat_4_desc: "మీరు ఫాలో అవుతున్న సమస్య స్థితి మారినప్పుడు నోటిఫికేషన్ పొందండి.",
            stat_total: "మొత్తం ఫిర్యాదులు:",
            stat_active: "యాక్టివ్ సమస్యలు:",
            stat_resolved: "పరిష్కరించబడినవి:",
            stat_users: "వినియోగదారులు:",
            testimonials_title: "ప్రజల అభిప్రాయాలు",
            testimonial_1: "\"క్రౌడ్‌సాల్వ్ ద్వారా మా వీధిలోని గుంతల గురించి ఫిర్యాదు చేయడం చాలా సులభమైంది. వారం రోజుల్లో రోడ్డు బాగుచేశారు!\"",
            testimonial_1_role: "స్థానిక నివాసి",
            testimonial_2: "\"మునిసిపల్ అధికారిగా, క్రౌడ్‌సాల్వ్ మాకు కమ్యూనిటీ నివేదికల ఆధారంగా సమస్యలను ప్రాధాన్యత ఇవ్వడంలో సహాయపడుతుంది. ఇది మా ప్రతిస్పందన సమయాన్ని మెరుగుపరచడానికి ఒక అమూల్యమైన సాధనం!\"",
            testimonial_2_role: "మునిసిపల్ అధికారి",
            testimonial_3: "\"నేను విరిగిపోయిన స్ట్రీట్‌లైట్ గురించి నివేదించాను మరియు అది 3 రోజుల్లోనే పరిష్కరించబడింది! రియల్ టైమ్ అప్‌డేట్‌లు నన్ను నిరంతరం సమాచారంతో ఉంచాయి. గొప్ప చొరవ!\"",
            testimonial_3_role: "కమ్యూనిటీ సభ్యుడు",

            // Issues Page
            issues_title: "కమ్యూనిటీ సమస్యల ట్రాకర్",
            search_placeholder: "శోధించండి...",
            filter_cat_all: "అన్ని వర్గాలు",
            filter_cat_roads: "రోడ్లు",
            filter_cat_garbage: "చెత్త",
            filter_cat_electricity: "కరెంట్",
            filter_cat_water: "నీరు",
            filter_cat_safety: "భద్రత",
            filter_status_all: "అన్ని స్థితులు",
            filter_status_pending: "పెండింగ్",
            filter_status_progress: "పని జరుగుతోంది",
            filter_status_resolved: "పరిష్కరించబడింది",
            filter_priority_all: "అన్ని ప్రాధాన్యతలు",
            filter_priority_high: "అధిక",
            filter_priority_medium: "మధ్యస్థ",
            label_desc: "పూర్తి వివరాలు",
            label_upload: "ఫోటో అప్లోడ్ చేయండి",
            label_select_photo: "ఫోటో ఎంచుకోండి",
            label_location: "లొకేషన్",
            placeholder_location: "లొకేషన్ పొందుతోంది...",
            placeholder_pincode: "పిన్ కోడ్",
            btn_submit_report: "ఫిర్యాదు సమర్పించండి",
            msg_location_not_found: "లొకేషన్ దొరకలేదు.",
            msg_address_not_found: "చిరునామా దొరకలేదు",
            msg_error_fetching: "ఎర్రర్",
            msg_issue_submitted: "ఫిర్యాదు సమర్పించబడింది! ID: ",

            // About Page
            about_title: "క్రౌడ్‌సాల్వ్ గురించి",
            about_purpose_title: "మా ఉద్దేశ్యం",
            about_purpose_desc: "పౌరులు మరియు అధికారుల మధ్య వారధిగా క్రౌడ్‌సాల్వ్ పనిచేస్తుంది.",
            about_mission_title: "మా లక్ష్యం",
            about_mission_desc: "పారదర్శకమైన మరియు వేగవంతమైన సమస్య పరిష్కార వ్యవస్థను సృష్టించడం.",
            about_vision_title: "మా విజన్",
            about_vision_desc: "ప్రతి ఒక్కరూ బాధ్యతగా ఉంటూ నగరాన్ని అభివృద్ధి చేయడం.",
            about_team_title: "మా టీమ్",
            about_team_members: "సభ్యులు",
            btn_see_issues: "సమస్యలు చూడండి",

            // Contact Page
            contact_title: "మమ్మల్ని సంప్రదించండి",
            label_name: "మీ పేరు",
            placeholder_name: "రాజు",
            label_email: "మీ ఇమెయిల్",
            placeholder_email: "raju@example.com",
            label_message: "సందేశం",
            placeholder_message: "మేము మీకు ఎలా సహాయపడగలము?",
            btn_send_message: "పంపండి",
            contact_support_text: "సాంకేతిక సహాయం కోసం మెయిల్ చేయండి",

            // Report Page (report.html)
            report_page_title: "పౌర సమస్యను నివేదించండి",
            label_title: "సమస్య శీర్షిక",
            placeholder_title: "సమస్య శీర్షికను నమోదు చేయండి",
            label_category: "వర్గం",
            select_cat_placeholder: "వర్గాన్ని ఎంచుకోండి",
            placeholder_desc: "సమస్యను వివరంగా వివరించండి",

            // Issues Page (issues.html)
            card_trending: "ట్రెండింగ్",
            card_view_details: "వివరాలు చూడండి",
            btn_voted: "ఓటు వేశారు!",
            btn_upvote: "ఓటు వేయండి",
            chart_status_title: "సమస్య స్థితి అవలోకనం",
            chart_category_title: "వర్గాల పంపిణీ",
            no_issues_msg: "ప్రస్తుత ఫిల్టర్‌లకు సరిపోయే సమస్యలు లేవు.",
            no_issues_sub: "వర్గం లేదా స్థితి ఎంపికను సర్దుబాటు చేయడానికి ప్రయత్నించండి.",
            label_priority: "ప్రాధాన్యత",

            // Details Page (details.html)
            issue_desc_title: "సమస్య వివరణ",
            status_timeline_title: "స్థితి కాలక్రమం",
            timeline_assigned: "కేటాయింపు మరియు తనిఖీ పూర్తయింది",
            timeline_reported: "నివేదించబడింది",
            status_action_title: "స్థితి మరియు చర్య",
            current_status_label: "ప్రస్తుత స్థితి",
            community_impact_label: "కమ్యూనిటీ ప్రభావం",
            votes_label: "ఓట్లు",
            location_label: "స్థానం",
            map_placeholder: "మ్యాప్ వ్యూ",
            upvotes_suffix: "ఓట్లు",
            msg_vote_success: "మీరు ఈ సమస్యకు విజయవంతంగా ఓటు వేశారు! మీ మద్దతు ముఖ్యం.",
            msg_already_voted: "మీరు ఇప్పటికే ఈ సమస్యకు ఓటు వేశారు.",
            msg_report_success: "🚀 సమస్య విజయవంతంగా నివేదించబడింది! మా బృందం త్వరలో సమీక్షించి స్థితిని అప్‌డేట్ చేస్తుంది.",
            msg_issue_submitted: "సమస్య విజయవంతంగా సమర్పించబడింది! సమస్య ఐడి: ",
            msg_contact_success: "📬 సందేశం విజయవంతంగా పంపబడింది! మేము 48 గంటల్లో మిమ్మల్ని సంప్రదిస్తాము.",

            // AI Assistant
            ai_greeting: "నమస్కారం! 👋 నేను మీ స్మార్ట్ సిటీ అసిస్టెంట్‌ని. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?",
            ai_fab_label: "నేను మీకు ఎలా సహాయపడగలను?",
            ai_header_title: "స్మార్ట్ AI అసిస్టెంట్",
            ai_header_subtitle: "సిటిజన్స్ హబ్ సపోర్ట్",
            ai_opt_report: "సమస్యను నివేదించండి",
            ai_opt_track: "సమస్యను ట్రాక్ చేయండి",
            ai_opt_explain: "ఇది ఎలా పనిచేస్తుంది?",
            ai_opt_contact: "మమ్మల్ని సంಪ್ರదించండి",
            ai_opt_yes_report: "అవును, నన్ను అక్కడికి తీసుకెళ్లండి",
            ai_opt_how_report: "నేను ఎలా నివేదించాలి?",
            ai_opt_back: "వెనుకకు",
            ai_opt_yes_track: "అవును, సమస్యలను చూపించు",
            ai_opt_how_track: "ఎలా ట్రాక్ చేయాలి?",
            ai_opt_report_now: "ఇప్పుడే నివేదించండి",
            ai_opt_got_it: "అర్థమైంది!",
            ai_opt_back_menu: "మెనూకు తిరిగి వెళ్ళు",
            ai_opt_start_over: "మళ్ళీ ప్రారంభించు",
            ai_msg_report_intro: "పౌర సమస్యను నివేదించడంలో నేను మీకు సహాయపడగలను! ఇది చాలా సులభమైన ప్రక్రియ. మీరు ఇప్పుడు రిపోర్టింగ్ పేజీకి వెళ్లాలనుకుంటున్నారా?",
            ai_msg_track_intro: "మీరు మా 'సమస్యలను వీక్షించండి' పేజీలో ఏదైనా నివేదించబడిన సమస్య స్థితిని ట్రాక్ చేయవచ్చు. నేను మిమ్మల్ని అక్కడికి తీసుకెళ్లాలా?",
            ai_msg_explain_intro: "క్రౌడ్‌సాల్వ్ ಹೇಗೆ పనిచేస్తుందో ఇక్కడ ఉంది:",
            ai_msg_contact_intro: "మీరు కాంటాక్ట్ పేజీ ద్వారా మా టీమ్‌ని సంప్రదించవచ్చు. మీరు అక్కడికి వెళ్లాలనుకుంటున్నారా?",
            ai_opt_yes_contact: "అవును, నన్ను అక్కడికి తీసుకెళ్లండి",
            ai_msg_error: "క్షమించండి, నాకు సరిగ్గా అర్థం కాలేదు. మీరు మళ్ళీ ప్రారంభించాలనుకుంటున్నారా?",
            ai_msg_report_steps: "సమస్యను నివేదించడానికి:\n1. 'రిపోర్ట్ ఇష్యూ' క్లిక్ చేయండి\n2. సమస్య యొక్క ఫోటో తీయండి\n3. మా యాప్ ఆటోమేటిక్‌గా లొకేషన్‌ను ట్యాగ్ చేస్తుంది!\n4. వివరణను జోడించి సమర్పించండి.",
            ai_msg_track_steps: "'సమస్యలను వీక్షించండి' పేజీలో, మీరు రియల్ టైమ్ అప్‌డేట్‌లను చూడవచ్చు: \n- పెండింగ్: అందింది\n- పని జరుగుతోంది: టీమ్ కేటాయించబడింది\n- పరిష్కరించబడింది: బాగుచేయబడింది!",
            ai_msg_explain_steps: "📸 **స్టెప్ 1: సమస్యను నివేదించండి**\nసమస్య యొక్క ఫోటో తీసి అప్‌లోడ్ చేయండి. పెద్ద ఫారమ్‌లు లేవు!\n\n📍 **స్టెప్ 2: ఆటో లొకేషన్ గుర్తింపు**\nGPS ఉపయోగించి మీ లొకేషన్ ఆటోమేటిక్‌గా క్యాప్చర్ చేయబడుతుంది.\n\n🤝 **స్టెప్ 3: కమ్యూనిటీ ధృవీకరణ**\nదగ్గరలోని పౌరులు ధృవీకరించగలరు మరియు ఓటు వేయగలరు.\n\n🏛 **స్టెప్ 4: అధికారిక చర్య**\nఅధికారులు ఓట్లు ఎక్కువగా వచ్చిన సమస్యలను ముందుగా చూస్తారు.\n\n📷 **స్టెప్ 5: ధృవీకరించబడిన పరిష్కారం**\nఅధికారులు అదే లొకేషన్ నుండి క్లోజింగ్ ఫోటోను అప్‌లోడ్ చేస్తారు।"
        },
        kn: {
            // Navbar & Footer
            nav_home: "ಮುಖಪುಟ",
            nav_view_issues: "ಸಮಸ್ಯೆಗಳು",
            nav_report_issue: "ದೂರು ನೀಡಿ",
            nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
            nav_contact: "ಸಂಪರ್ಕಿಸಿ",
            nav_select_lang: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
            nav_toggle_theme: "ಥೀಮ್ ಬದಲಾಯಿಸಿ",
            footer_text: "© 2025 CrowdSolve. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

            // Home Page
            hero_title_1: "ಕ್ರೌಡ್‌ಸಾಲ್ವ್ –",
            hero_title_2: "ನಾಗರಿಕ ಸಮಸ್ಯೆ",
            hero_title_3: "ಪರಿಹಾರ ವೇದಿಕೆ",
            hero_subtitle: "ನಾಗರಿಕರು ತಮ್ಮ **ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಲು** ಮತ್ತು **ಪರಿಹಾರವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು** ಸಹಕಾರಿ.",
            btn_report: "ದೂರು ನೀಡಿ",
            btn_view: "ಸಮಸ್ಯೆಗಳು",
            features_title: "ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು",
            feat_1_title: "ಫೋಟೋಗಳೊಂದಿಗೆ ವರದಿ ಮಾಡಿ",
            feat_1_desc: "ಸಮಸ್ಯೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರಣಕ್ಕಾಗಿ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
            feat_2_title: "ಸ್ಥಳ ಆಧಾರಿತ ವರದಿ",
            feat_2_desc: "ಮ್ಯಾಪ್‌ನಲ್ಲಿ ನಿಖರವಾದ ಸ್ಥಳವನ್ನು ಗುರುತಿಸಿ.",
            feat_3_title: "ದೂರಿನ ಸ್ಥಿತಿ",
            feat_3_desc: "ದೂರಿನ ಪ್ರಗತಿಯನ್ನು ಗಮನಿಸಿ.",
            feat_4_title: "ರಿಯಲ್-ಟೈಮ್ ಅಪ್ಡೇಟ್ಸ್",
            feat_4_desc: "ದೂರಿನ ಸ್ಥಿತಿ ಬದಲಾದಾಗ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",
            stat_total: "ಒಟ್ಟು ದೂರುಗಳು:",
            stat_active: "ಸಕ್ರಿಯ ಸಮಸ್ಯೆಗಳು:",
            stat_resolved: "ಬಗೆಹರಿದಿದೆ:",
            stat_users: "ಬಳಕೆದಾರರು:",
            testimonials_title: "ಜನರ ಮಾತು",
            testimonial_1: "\"ನನ್ನ ಮನೆಯ ರಸ್ತೆಯ ಗುಂಡಿಯನ್ನು ಸರಿಪಡಿಸಲು ಈ ಆಪ್ ತುಂಬಾ ಸಹಾಯ ಮಾಡಿತು.\"",
            testimonial_1_role: "ಸ್ಥಳೀಯ ನಿವಾಸಿ",
            testimonial_2: "\"ನಗರಪಾಲಿಕೆ ಅಧಿಕಾರಿಯಾಗಿ, ಸಮುದಾಯದ ವರದಿಗಳ ಆಧಾರದ ಮೇಲೆ ಸಮಸ್ಯೆಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡಲು ಕ್ರೌಡ್‌ಸಾಲ್ವ್ ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ನಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯ ಸಮಯವನ್ನು ಸುಧಾರಿಸಲು ಇದು ಅಮೂಲ್ಯವಾದ ಸಾಧನವಾಗಿದೆ!\"",
            testimonial_2_role: "ನಗರಪಾಲಿಕೆ ಅಧಿಕಾರಿ",
            testimonial_3: "\"ನಾನು ಮುರಿದ ಬೀದಿ ದೀಪದ ಬಗ್ಗೆ ದೂರು ನೀಡಿದ್ದೆ ಮತ್ತು ಅದು 3 ದಿನಗಳಲ್ಲಿ ಸರಿಯಾಯಿತು! ರಿಯಲ್-ಟೈಮ್ ಅಪ್ಡೇಟ್ಸ್ ನನಗೆ ನಿರಂತರ ಮಾಹಿತಿ ನೀಡಿತು. ಉತ್ತಮ ಉಪಕ್ರಮ!\"",
            testimonial_3_role: "ಸಮುದಾಯದ ಸದಸ್ಯ",

            // Issues Page
            issues_title: "ಸಮುದಾಯ ಸಮಸ್ಯೆ ಟ್ರ್ಯಾಕರ್",
            search_placeholder: "ಹುಡುಕಿ...",
            filter_cat_all: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
            filter_cat_roads: "ರಸ್ತೆಗಳು",
            filter_cat_garbage: "ಕಸ",
            filter_cat_electricity: "ವಿದ್ಯುತ್",
            filter_cat_water: "ನೀರು",
            filter_cat_safety: "ಸುರಕ್ಷತೆ",
            filter_status_all: "ಎಲ್ಲಾ ಹಂತಗಳು",
            filter_status_pending: "ಬಾಕಿ ಇದೆ",
            filter_status_progress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
            filter_status_resolved: "ಬಗೆಹರಿದಿದೆ",
            filter_priority_all: "ಎಲ್ಲಾ ಆದ್ಯತೆಗಳು",
            filter_priority_high: "ಹೆಚ್ಚಿನ",
            filter_priority_medium: "ಮಧ್ಯಮ",
            label_desc: "ವಿವರಣೆ",
            label_upload: "ಫೋಟೋ ಅಪ್ಲೋಡ್",
            label_select_photo: "ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
            label_location: "ಸ್ಥಳ",
            placeholder_location: "ಸ್ಥಳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
            placeholder_pincode: "ಪಿನ್ ಕೋಡ್",
            btn_submit_report: "ದೂರು ಸಲ್ಲಿಸಿ",
            msg_location_not_found: "ಸ್ಥಳ ಸಿಗುತ್ತಿಲ್ಲ.",
            msg_address_not_found: "ವಿಳಾಸ ಸಿಗುತ್ತಿಲ್ಲ",
            msg_error_fetching: "ದೋಷ",
            msg_issue_submitted: "ದೂರು ಸಲ್ಲಿಕೆಯಾಗಿದೆ! ID: ",

            // About Page
            about_title: "ನಮ್ಮ ಬಗ್ಗೆ",
            about_purpose_title: "ನಮ್ಮ ಉದ್ದೇಶ",
            about_purpose_desc: "ನಾಗರಿಕರು ಮತ್ತು ಅಧಿಕಾರಿಗಳ ನಡುವೆ ಸೇತುವೆಯಾಗಿ ಕೆಲಸ ಮಾಡುವುದು.",
            about_mission_title: "ನಮ್ಮ ಗುರಿ",
            about_mission_desc: "ಪಾರದರ್ಶಕ ಮತ್ತು ತ್ವರಿತ ಪರಿಹಾರ ವ್ಯವಸ್ಥೆ.",
            about_vision_title: "ನಮ್ಮ ಕನಸು",
            about_vision_desc: "ನಗರದ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿ ಜನರ ಪಾಲುದಾರಿಕೆ.",
            about_team_title: "ನಮ್ಮ ತಂಡ",
            about_team_members: "ಸದಸ್ಯರು",
            btn_see_issues: "ಮುಂದೆ ನೋಡಿ",

            // Contact Page
            contact_title: "ಸಂಪರ್ಕಿಸಿ",
            label_name: "ಹೆಸರು",
            placeholder_name: "ರಾಜು",
            label_email: "ಇಮೇಲ್",
            placeholder_email: "raju@example.com",
            label_message: "ಸಂದೇಶ",
            placeholder_message: "ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
            btn_send_message: "ಕಳುಹಿಸಿ",
            contact_support_text: "ತಾಂತ್ರಿಕ ಸಹಾಯಕ್ಕಾಗಿ ಇಮೇಲ್ ಮಾಡಿ",

            // Report Page (report.html)
            report_page_title: "ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
            label_title: "ಸಮಸ್ಯೆಯ ಶೀರ್ಷಿಕೆ",
            placeholder_title: "ಸಮಸ್ಯೆಯ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ",
            label_category: "ವರ್ಗ",
            select_cat_placeholder: "ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            placeholder_desc: "ಸಮಸ್ಯೆಯನ್ನು ವಿವರವಾಗಿ ವಿವರಿಸಿ",

            // Issues Page (issues.html)
            card_trending: "ಟ್ರೆಂಡಿಂಗ್",
            card_view_details: "ವಿವರಗಳನ್ನು ನೋಡಿ",
            btn_voted: "ಮತ ನೀಡಲಾಗಿದೆ!",
            btn_upvote: "ಮತ ನೀಡಿ",
            chart_status_title: "ಸಮಸ್ಯೆಯ ಸ್ಥಿತಿಯ ಅವಲೋಕನ",
            chart_category_title: "ವರ್ಗಗಳ ವಿತರಣೆ",
            no_issues_msg: "ಪ್ರಸ್ತುತ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಸಮಸ್ಯೆಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
            no_issues_sub: "ವರ್ಗ ಅಥವಾ ಸ್ಥಿತಿ ಆಯ್ಕೆಯನ್ನು ಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ.",
            label_priority: "ಆದ್ಯತೆ",

            // Details Page (details.html)
            issue_desc_title: "ಸಮಸ್ಯೆಯ ವಿವರಣೆ",
            status_timeline_title: "ಸ್ಥಿತಿಯ ಕಾಲಮಿತಿ",
            timeline_assigned: "ನಿಯೋಜಿಸಲಾಗಿದೆ ಮತ್ತು ತಪಾಸಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
            timeline_reported: "ವರದಿ ಮಾಡಲಾಗಿದೆ",
            status_action_title: "ಸ್ಥಿತಿ ಮತ್ತು ಕ್ರಮ",
            current_status_label: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
            community_impact_label: "ಸಮುದಾಯದ ಪರಿಣಾಮ",
            votes_label: "ಮತಗಳು",
            location_label: "ಸ್ಥಳ",
            map_placeholder: "ಮ್ಯಾಪ್ ವ್ಯೂ",
            upvotes_suffix: "ಮತಗಳು",
            msg_vote_success: "ನೀವು ಈ ಸಮಸ್ಯೆಗೆ ಯಶಸ್ವಿಯಾಗಿ ಮತ ನೀಡಿದ್ದೀರಿ! ನಿಮ್ಮ ಬೆಂಬಲ ಮುಖ್ಯವಾಗಿದೆ.",
            msg_already_voted: "ನೀವು ಈಗಾಗಲೇ ಈ ಸಮಸ್ಯೆಗೆ ಮತ ನೀಡಿದ್ದೀರಿ.",
            msg_report_success: "🚀 ಸಮಸ್ಯೆ ಯಶಸ್ವಿಯಾಗಿ ವರದಿಯಾಗಿದೆ! ನಮ್ಮ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ಪರಿಶೀಲಿಸುತ್ತದೆ ಮತ್ತು ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸುತ್ತದೆ.",
            msg_issue_submitted: "ಸಮಸ್ಯೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ! ಸಮಸ್ಯೆಯ ಐಡಿ: ",
            msg_contact_success: "📬 ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ! ನಾವು 48 ಗಂಟೆಗಳ ಒಳಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",

            // AI Assistant
            ai_greeting: "ನಮಸ್ಕಾರ! 👋 ನಾನು ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಅಸಿಸ್ಟೆಂಟ್. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
            ai_fab_label: "ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
            ai_header_title: "ಸ್ಮಾರ್ಟ್ AI ಅಸಿಸ್ಟೆಂಟ್",
            ai_header_subtitle: "ಸಿಟಿಜನ್ಸ್ ಹಬ್ ಸಪೋರ್ಟ್",
            ai_opt_report: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
            ai_opt_track: "ಸಮಸ್ಯೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
            ai_opt_explain: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?",
            ai_opt_contact: "ಸಂಪರ್ಕಿಸಿ",
            ai_opt_yes_report: "ಹೌದು, ನನ್ನನ್ನು ಅಲ್ಲಿಗೆ ಕರೆದೊಯ್ಯಿರಿ",
            ai_opt_how_report: "ನಾನು ವರದಿ ಮಾಡುವುದು ಹೇಗೆ?",
            ai_opt_back: "ಹಿಂದಕ್ಕೆ",
            ai_opt_yes_track: "ಹೌದು, ಸಮಸ್ಯೆಗಳನ್ನು ತೋರಿಸಿ",
            ai_opt_how_track: "ಟ್ರ್ಯಾಕ್ ಮಾಡುವುದು ಹೇಗೆ?",
            ai_opt_report_now: "ಈಗಲೇ ವರದಿ ಮಾಡಿ",
            ai_opt_got_it: "ಅರ್ಥವಾಯಿತು!",
            ai_opt_back_menu: "ಮೆನುಗೆ ಹಿಂತಿರುಗಿ",
            ai_opt_start_over: "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
            ai_msg_report_intro: "ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ! ಇದು ತುಂಬಾ ಸರಳವಾದ ಪ್ರಕ್ರಿಯೆ. ನೀವು ಈಗ ವರದಿ ಮಾಡುವ ಪುಟಕ್ಕೆ ಹೋಗಲು ಬಯಸುವಿರಾ?",
            ai_msg_track_intro: "ನಮ್ಮ 'ಸಮಸ್ಯೆಗಳನ್ನು ನೋಡಿ' ಪುಟದಲ್ಲಿ ನೀವು ಯಾವುದೇ ವರದಿ ಮಾಡಿದ ಸಮಸ್ಯೆಯ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಬಹುದು. ನಾನು ನಿಮ್ಮನ್ನು ಅಲ್ಲಿಗೆ ಕರೆದೊಯ್ಯಲೇ?",
            ai_msg_explain_intro: "ಕ್ರೌಡ್‌ಸಾಲ್ವ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ಎಂಬುದು ಇಲ್ಲಿದೆ:",
            ai_msg_contact_intro: "ಸಂಪರ್ಕ ಪುಟದ ಮೂಲಕ ನೀವು ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು. ನೀವು ಅಲ್ಲಿಗೆ ಹೋಗಲು ಬಯಸುವಿರಾ?",
            ai_opt_yes_contact: "ಹೌದು, ನನ್ನನ್ನು ಅಲ್ಲಿಗೆ ಕರೆದೊಯ್ಯಿರಿ",
            ai_msg_error: "ಕ್ಷಮಿಸಿ, ನನಗೆ ಸರಿಯಾಗಿ ಅರ್ಥವಾಗಲಿಲ್ಲ. ನೀವು ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಲು ಬಯಸುವಿರಾ?",
            ai_msg_report_steps: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಲು:\n1. 'ವರದಿ ಸಮಸ್ಯೆ' ಕ್ಲಿಕ್ ಮಾಡಿ\n2. ಸಮಸ್ಯೆಯ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ\n3. ನಮ್ಮ ಆಪ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸ್ಥಳವನ್ನು ಗುರುತಿಸುತ್ತದೆ!\n4. ವಿವರಣೆಯನ್ನು ಸೇರಿಸಿ ಸಲ್ಲಿಸಿ.",
            ai_msg_track_steps: "'ಸಮಸ್ಯೆಗಳನ್ನು ನೋಡಿ' ಪುಟದಲ್ಲಿ, ನೀವು ನೈಜ-ಸಮಯದ ಅಪ್‌ಡೇಟ್‌ಗಳನ್ನು ನೋಡಬಹುದು: \n- ಬಾಕಿ ಇದೆ: ಸ್ವೀಕರಿಸಲಾಗಿದೆ\n- ಪ್ರಗತಿಯಲ್ಲಿದೆ: ತಂಡವನ್ನು ನಿಯೋಜಿಸಲಾಗಿದೆ\n- ಬಗೆಹರಿದಿದೆ: ಸರಿಪಡಿಸಲಾಗಿದೆ!",
            ai_msg_explain_steps: "📸 **ಹಂತ 1: ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ**\nಸಮಸ್ಯೆಯ ಫೋಟೋ ತೆಗೆದು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ದೊಡ್ಡ ಫಾರಂಗಳು ಇಲ್ಲ!\n\n📍 **ಹಂತ 2: ಸ್ವಯಂಚಾಲಿತ ಸ್ಥಳ ಪತ್ತೆ**\nGPS ಬಳಸಿ ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಗುರುತಿಸಲಾಗುತ್ತದೆ.\n\n🤝 **ಹಂತ 3: ಸಮುದಾಯ ಪರಿಶೀಲನೆ**\nಹತ್ತಿರದ ನಾಗರಿಕರು ಪರಿಶೀಲಿಸಬಹುದು ಮತ್ತು ಮತ ಹಾಕಬಹುದು.\n\n🏛 **ಹಂತ 4: ಅಧಿಕಾರಿಗಳ ಕ್ರಮ**\nಹೆಚ್ಚು ಮತಗಳನ್ನು ಪಡೆದ ಸಮಸ್ಯೆಗಳನ್ನು ಅಧಿಕಾರಿಗಳು ಮೊದಲು ನೋಡುತ್ತಾರೆ.\n\n📷 **ಹಂತ 5: ಪರಿಶೀಲಿಸಿದ ಪರಿಹಾರ**\nಅಧಿಕಾರಿಗಳು ಅದೇ ಸ್ಥಳದಿಂದ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುತ್ತಾರೆ।"
        }
    };

    const langSelector = document.getElementById('lang-selector');
    const mobileLangSelector = document.getElementById('mobile-lang-selector');

    // Check saved language or default to English
    window.currentLang = localStorage.getItem('language') || 'en';

    window.updateLanguage = function (lang) {
        window.currentLang = lang; // Keep currentLang updated
        if (!window.translations[lang]) return;

        // Store selected language in localStorage
        localStorage.setItem('language', lang); // Use 'language' key for consistency

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = window.translations[lang][key];

            if (translation) {
                // Special handling for common UI patterns
                if (key === 'hero_subtitle' || key === 'about_purpose_desc') {
                    element.innerHTML = translation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                }
                // Update placeholder for inputs and textareas
                else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                }
                // Update title attribute if applicable (e.g. for accessibility)
                else if (element.hasAttribute('title')) {
                    element.title = translation;
                }
                // Default: Update text content
                else {
                    // Preserving icon if it exists as a direct child
                    const icon = element.querySelector('i');
                    if (icon) {
                        element.innerHTML = `${icon.outerHTML}${translation}`;
                    } else {
                        element.innerText = translation;
                    }
                }
            }
        });

        // Update dropdowns/selectors to match
        if (langSelector) langSelector.value = lang;
        if (mobileLangSelector) mobileLangSelector.value = lang;

        // Custom updates for charts if they exist (Home Page)
        if (window.statusChart && window.translations[lang]['chart_status_title']) {
            // This is a bit tricky since Chart.js labels are separate, 
            // but we can at least update the main legend if needed or just let the static labels handle it.
        }
    }

    // Initialize Language
    window.updateLanguage(window.currentLang);

    // Event Listeners
    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            window.updateLanguage(e.target.value);
        });
    }

    if (mobileLangSelector) {
        mobileLangSelector.addEventListener('change', (e) => {
            window.updateLanguage(e.target.value);
        });
    }

    // 4. Real-time Stats & Chart
    function updateFeatureStats() {
        if (typeof Database !== 'undefined') {
            const stats = Database.getStats();

            const totalEl = document.getElementById('stats-total-issues');
            const activeEl = document.getElementById('stats-active-issues');
            const resolvedEl = document.getElementById('stats-resolved-issues');
            const usersEl = document.getElementById('stats-total-users');

            if (totalEl) totalEl.innerText = stats.totalIssues;
            if (activeEl) activeEl.innerText = stats.pendingIssues + stats.inProgressIssues;
            if (resolvedEl) resolvedEl.innerText = stats.resolvedIssues;
            if (usersEl) usersEl.innerText = stats.totalUsers;

            // 1. Render Status Bar Chart
            const statusCtx = document.getElementById('issuesChart');
            if (statusCtx) {
                if (window.myChart) {
                    window.myChart.destroy();
                }

                window.myChart = new Chart(statusCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Pending', 'In Progress', 'Resolved'],
                        datasets: [{
                            label: 'Issues by Status',
                            data: [stats.pendingIssues, stats.inProgressIssues, stats.resolvedIssues],
                            backgroundColor: [
                                'rgba(239, 68, 68, 0.7)',
                                'rgba(59, 130, 246, 0.7)',
                                'rgba(34, 197, 94, 0.7)'
                            ],
                            borderColor: [
                                'rgba(239, 68, 68, 1)',
                                'rgba(59, 130, 246, 1)',
                                'rgba(34, 197, 94, 1)'
                            ],
                            borderWidth: 1,
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: { displayColors: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1, color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#4b5563' },
                                grid: { color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
                            },
                            x: {
                                ticks: { color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#4b5563' },
                                grid: { display: false }
                            }
                        }
                    }
                });
            }

            // 2. Render Category Doughnut Chart
            const categoryCtx = document.getElementById('categoryChart');
            if (categoryCtx) {
                const issues = Database.getAllIssues();
                const categoryCounts = {};

                issues.forEach(issue => {
                    const cat = issue.category || 'Other';
                    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
                    categoryCounts[label] = (categoryCounts[label] || 0) + 1;
                });

                const labels = Object.keys(categoryCounts).length ? Object.keys(categoryCounts) : ['Roads', 'Water', 'Waste', 'Other'];
                const data = Object.values(categoryCounts).length ? Object.values(categoryCounts) : [0, 0, 0, 0];

                if (window.catChart) {
                    window.catChart.destroy();
                }

                window.catChart = new Chart(categoryCtx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                'rgba(239, 68, 68, 0.7)',
                                'rgba(59, 130, 246, 0.7)',
                                'rgba(245, 158, 11, 0.7)',
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(139, 92, 246, 0.7)'
                            ],
                            borderColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 20,
                                    usePointStyle: true,
                                    color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
                                }
                            }
                        },
                        cutout: '65%'
                    }
                });
            }
        }
    }

    // Update stats on load
    updateFeatureStats();
});