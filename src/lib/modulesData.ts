// DevPulse Modules Data and Validation Engines

export interface ModuleData {
  id: number;
  title: string;
  stage: 'html' | 'css' | 'javascript';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  tutorial: string;
  exampleCode: string;
  activityDescription: string;
  activityStarter: string;
  activityValidation: (code: string, iframe: any, logs: any[], fetchCalls: any[]) => Promise<{ passed: boolean; message: string }> | { passed: boolean; message: string };
  challengeDescription: string;
  challengeValidation: (code: string, iframe: any, logs: any[], fetchCalls: any[]) => Promise<{ passed: boolean; message: string }> | { passed: boolean; message: string };
}

export const DevPulseModules: ModuleData[] = [
  // ==========================================
  // STAGE 1: HTML FOUNDATIONS (Modules 1-5)
  // ==========================================
  {
    id: 1,
    title: "HTML Document Structure & Boilerplate",
    stage: "html",
    difficulty: "beginner",
    description: "Learn the standard skeleton of every HTML page and why each tag is required.",
    tutorial: `### The HTML Skeleton
Every webpage you visit is structured using HTML (HyperText Markup Language). Before adding content, every HTML document must start with a standardized boilerplate structure. This is the **skeleton** of your webpage.

Let's break down the core components:
1. \`<!DOCTYPE html>\`: This is the document type declaration. It tells the browser that this is an HTML5 document.
2. \`<html lang=\"en\">\`: The root element that wraps all content. The \`lang\` attribute sets the primary language for accessibility and search engines.
3. \`<head>\`: This section contains metadata (data about data) that isn't displayed on the page but is crucial for the browser (character sets, viewport settings, and the page title).
4. \`<meta charset=\"UTF-8\">\`: Defines the character encoding, allowing the page to display almost all human languages and symbols.
5. \`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\`: Ensures your page scales correctly on mobile devices.
6. \`<title>\`: Sets the title shown in the browser tab.
7. \`<body>\`: Contains the actual content (headings, paragraphs, images) visible to the user.

### Why this matters
Without a proper doctype and viewport settings, browsers might render your page in "quirks mode," breaking modern CSS layouts, and mobile screens will show a tiny, zoomed-out version of your desktop design.`,
    exampleCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Boilerplate</title>
</head>
<body>
    <h1>Welcome to DevPulse!</h1>
    <p>This is a standard HTML5 skeleton. All visible content goes inside the body tags.</p>
</body>
</html>`,
    activityDescription: `### Activity: Forge a Boilerplate
Create a valid HTML boilerplate from scratch. Ensure it contains all essential metadata and elements.

#### Objectives:
1. Add the \`<!DOCTYPE html>\` declaration.
2. Add an \`<html>\` element with \`lang=\"en\"\`.
3. Add a \`<head>\` containing:
   - A \`<meta charset=\"UTF-8\">\` tag.
   - A viewport meta tag with content \`width=device-width, initial-scale=1.0\`.
   - A \`<title>\` element containing exactly **\"My First Forge\"**.
4. Add a \`<body>\` containing:
   - An \`<h1>\` tag with the text **\"Boilerplate Active\"**.`,
    activityStarter: `<!-- Write your HTML boilerplate here -->
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!/<!doctype\s+html>/i.test(code)) {
        return { passed: false, message: "❌ Missing '<!DOCTYPE html>' declaration at the very top." };
      }
      const html = doc.documentElement;
      if (!html) return { passed: false, message: "❌ Missing the '<html>' root element." };
      if (html.getAttribute('lang') !== 'en') {
        return { passed: false, message: "❌ The '<html>' tag must have the attribute lang=\"en\"." };
      }
      const head = doc.head;
      const body = doc.body;
      if (!head) return { passed: false, message: "❌ Missing the '<head>' element." };
      if (!body) return { passed: false, message: "❌ Missing the '<body>' element." };
      
      const metaCharset = head.querySelector('meta[charset]');
      if (!metaCharset || metaCharset.getAttribute('charset')?.toUpperCase() !== 'UTF-8') {
        return { passed: false, message: "❌ Missing or incorrect character encoding. Add '<meta charset=\"UTF-8\">'." };
      }
      const metaViewport = head.querySelector('meta[name="viewport"]');
      if (!metaViewport || !metaViewport.getAttribute('content')?.includes('width=device-width')) {
        return { passed: false, message: "❌ Missing or incorrect viewport meta tag for mobile responsiveness." };
      }
      if (doc.title !== "My First Forge") {
        return { passed: false, message: "❌ Page title must be exactly \"My First Forge\". Current: " + doc.title };
      }
      const h1 = body.querySelector('h1');
      if (!h1) return { passed: false, message: "❌ Missing an '<h1>' tag inside the '<body>'." };
      if (h1.textContent?.trim() !== "Boilerplate Active") {
        return { passed: false, message: "❌ The '<h1>' tag must contain the text \"Boilerplate Active\"." };
      }
      return { passed: true, message: "✅ Excellent! Your HTML boilerplate is structurally complete and valid." };
    },
    challengeDescription: `### Challenge: Responsive Client Shell
A client needs a responsive mobile-friendly index shell. 
Create an HTML5 document with:
- Title set to **\"Responsive Template\"**
- Meta charset UTF-8
- Viewport set to device width
- A \`<body>\` containing a paragraph (\`<p>\`) with the text **\"Hello from responsive space!\"**.
- A class \`responsive-text\` on the paragraph.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!/<!doctype\s+html>/i.test(code)) {
        return { passed: false, message: "❌ Missing '<!DOCTYPE html>' declaration." };
      }
      if (doc.title !== "Responsive Template") {
        return { passed: false, message: "❌ The page title must be exactly \"Responsive Template\"." };
      }
      const p = doc.querySelector('p.responsive-text');
      if (!p) {
        return { passed: false, message: "❌ Missing a '<p>' tag with class 'responsive-text'." };
      }
      if (p.textContent?.trim() !== "Hello from responsive space!") {
        return { passed: false, message: "❌ Paragraph text must be \"Hello from responsive space!\"." };
      }
      return { passed: true, message: "✅ Challenge complete! The template skeleton is responsive and matches specifications." };
    }
  },
  {
    id: 2,
    title: "Text, Headings, Lists, Links",
    stage: "html",
    difficulty: "beginner",
    description: "Learn how to format text, organize data using lists, and connect pages with links.",
    tutorial: `### Text Elements & Hyperlinks
Now that we have a skeleton, let's learn how to add and structure text content.

#### Headings and Paragraphs
HTML offers six levels of headings, \`<h1>\` through \`<h6>\`. \`<h1>\` represents the most important heading (usually the page title) and \`<h6>\` the least. Paragraphs are defined using the \`<p>\` tag, which automatically adds space before and after the text.

#### Lists
To group related items, you can use:
- **Unordered Lists** (\`<ul>\`): Bulleted list.
- **Ordered Lists** (\`<ol>\`): Numbered list.
Inside either list, each item must be wrapped in a List Item (\`<li>\`) tag.

#### Links (Anchors)
The Anchor tag (\`<a>\`) creates hyperlinks. It requires the \`href\` attribute to specify the destination URL:
\`\`\`html
<a href=\"https://example.com\" target=\"_blank\">Visit Example</a>
\`\`\`
- \`target=\"_blank\"\` opens the link in a new tab.

### Why this matters
Search engines (like Google) read your heading levels to understand what your page is about. Skipping heading ranks (e.g., jumping from \`<h1>\` to \`<h3>\`) hurts SEO and web accessibility.`,
    exampleCode: `<h1>Frontend Roadmap</h1>
<p>Here is how you can become a web developer:</p>

<h2>Key Skills</h2>
<ul>
    <li>HTML Structure</li>
    <li>CSS Styling</li>
    <li>JavaScript Interactivity</li>
</ul>

<p>Learn more at the <a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a>.</p>`,
    activityDescription: `### Activity: Building a Roadmap
Create a basic article structure listing topics to learn.

#### Objectives:
1. Create an \`<h2>\` heading containing exactly **\"Learning Roadmap\"**.
2. Create an ordered list (\`<ol>\`) with three list items (\`<li>\`):
   - First item text: **\"HTML\"**
   - Second item text: **\"CSS\"**
   - Third item text: **\"JavaScript\"**
3. Create a link (\`<a>\`) pointing to **\"https://jsonplaceholder.typicode.com\"** with the text **\"JSONPlaceholder\"**.`,
    activityStarter: `<!-- Create your Roadmap structure below -->
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const h2 = doc.querySelector('h2');
      if (!h2 || h2.textContent?.trim() !== "Learning Roadmap") {
        return { passed: false, message: "❌ Missing an '<h2>' tag containing exactly \"Learning Roadmap\"." };
      }
      const ol = doc.querySelector('ol');
      if (!ol) return { passed: false, message: "❌ Missing an ordered list '<ol>'." };
      const lis = ol.querySelectorAll('li');
      if (lis.length !== 3) {
        return { passed: false, message: "❌ Your '<ol>' must have exactly 3 list items ('<li>')." };
      }
      if (lis[0].textContent?.trim() !== "HTML" || lis[1].textContent?.trim() !== "CSS" || lis[2].textContent?.trim() !== "JavaScript") {
        return { passed: false, message: "❌ The list items must be exactly: \"HTML\", \"CSS\", and \"JavaScript\" in order." };
      }
      const a = doc.querySelector('a');
      if (!a) return { passed: false, message: "❌ Missing an anchor '<a>' link." };
      if (a.getAttribute('href') !== "https://jsonplaceholder.typicode.com") {
        return { passed: false, message: "❌ Anchor link href must point to 'https://jsonplaceholder.typicode.com'." };
      }
      if (a.textContent?.trim() !== "JSONPlaceholder") {
        return { passed: false, message: "❌ Anchor text must be exactly \"JSONPlaceholder\"." };
      }
      return { passed: true, message: "✅ Success! You've structured text, links, and lists correctly." };
    },
    challengeDescription: `### Challenge: Resources Block
Create:
- An \`<h3>\` heading **\"Reference Links\"**
- An unordered list (\`<ul>\`) containing two list items.
- The first item should contain a link to **\"https://google.com\"** with text **\"Google\"**.
- The second item should contain a link to **\"https://github.com\"** with text **\"GitHub\"** and open in a new tab (\`target=\"_blank\"\`).`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const h3 = doc.querySelector('h3');
      if (!h3 || h3.textContent?.trim() !== "Reference Links") {
        return { passed: false, message: "❌ Missing '<h3>' containing \"Reference Links\"." };
      }
      const ul = doc.querySelector('ul');
      if (!ul) return { passed: false, message: "❌ Missing unordered list '<ul>'." };
      const links = ul.querySelectorAll('li a');
      if (links.length !== 2) {
        return { passed: false, message: "❌ Unordered list must contain exactly 2 links inside '<li>' elements." };
      }
      if (links[0].getAttribute('href') !== "https://google.com" || links[0].textContent?.trim() !== "Google") {
        return { passed: false, message: "❌ First link must go to 'https://google.com' with text 'Google'." };
      }
      if (links[1].getAttribute('href') !== "https://github.com" || links[1].textContent?.trim() !== "GitHub") {
        return { passed: false, message: "❌ Second link must go to 'https://github.com' with text 'GitHub'." };
      }
      if (links[1].getAttribute('target') !== "_blank") {
        return { passed: false, message: "❌ Second link must open in a new tab using target=\"_blank\"." };
      }
      return { passed: true, message: "✅ Challenge complete! The reference section is fully operational and semantic." };
    }
  },
  {
    id: 3,
    title: "Forms & Input Elements",
    stage: "html",
    difficulty: "beginner",
    description: "Capture user input and perform basic validation using form controls.",
    tutorial: `### HTML Forms
Forms are how web pages collect data from users. Whether searching, logging in, or submitting a payment, forms power interactive web services.

#### The Form Element
A form is wrapped in a \`<form>\` tag. Inside, we use various inputs:
- \`<input type=\"text\">\`: For single-line text.
- \`<input type=\"email\">\`: Automatically checks for valid email formats.
- \`<input type=\"password\">\`: Obscures typed characters.
- \`<button type=\"submit\">\`: Submits the form data.

#### Client-Side Validation
Before sending data to a server, we should make sure the input matches basic rules.
- \`required\`: Forces the user to fill out the input.
- \`minlength\` / \`maxlength\`: Sets text length constraints.
- \`min\` / \`max\`: Sets numeric bounds.

### Why this matters
Validation protects users by catching errors early, saving network bandwidth and server processing power by rejecting garbage data instantly before it leaves the browser.`,
    exampleCode: `<form onsubmit="alert('Form Submitted!'); return false;">
    <label for="usr">Username:</label>
    <input type="text" id="usr" required minlength="3">
    
    <label for="mail">Email:</label>
    <input type="email" id="mail" required>
    
    <button type="submit">Submit Form</button>
</form>`,
    activityDescription: `### Activity: User Sign-Up Form
Build a basic registration form that validates user inputs.

#### Objectives:
1. Create a \`<form>\` element.
2. Inside the form, create a text input (\`<input type=\"text\">\`) with:
   - \`id=\"username\"\`
   - \`required\` attribute active.
3. Create an email input (\`<input type=\"email\">\`) with:
   - \`id=\"email\"\`
   - \`required\` attribute active.
4. Create a submit button (\`<button type=\"submit\">\`) containing the text **\"Sign Up\"**.`,
    activityStarter: `<!-- Create your signup form here -->
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const form = doc.querySelector('form');
      if (!form) return { passed: false, message: "❌ Missing the '<form>' wrapper." };
      const txtInput = form.querySelector('input[type="text"]') as any;
      if (!txtInput) return { passed: false, message: "❌ Missing an '<input type=\"text\">' element." };
      if (txtInput.id !== "username") return { passed: false, message: "❌ The text input must have id=\"username\"." };
      if (!txtInput.required) return { passed: false, message: "❌ The username input must be 'required'." };
      const emailInput = form.querySelector('input[type="email"]') as any;
      if (!emailInput) return { passed: false, message: "❌ Missing an '<input type=\"email\">' element." };
      if (emailInput.id !== "email") return { passed: false, message: "❌ The email input must have id=\"email\"." };
      if (!emailInput.required) return { passed: false, message: "❌ The email input must be 'required'." };
      const button = form.querySelector('button[type="submit"]') || form.querySelector('button:not([type])') || form.querySelector('input[type="submit"]') as any;
      if (!button) return { passed: false, message: "❌ Missing a submit button." };
      if (button.textContent?.trim() !== "Sign Up" && button.value !== "Sign Up") {
        return { passed: false, message: "❌ The submit button must contain the text or value \"Sign Up\"." };
      }
      return { passed: true, message: "✅ Fantastic! Your form captures inputs and validates them automatically." };
    },
    challengeDescription: `### Challenge: Feedback Form with Rating
Build a feedback form containing:
- A numeric rating (\`<input type=\"number\">\`) with \`id=\"rating\"\`, \`min=\"1\"\`, \`max=\"5\"\`, and \`required\`.
- A \`<textarea>\` with \`id=\"comments\"\` for comments.
- A submit button with text **\"Submit Review\"**.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const form = doc.querySelector('form');
      if (!form) return { passed: false, message: "❌ Missing the '<form>' wrapper." };
      const rating = form.querySelector('input[type="number"]#rating') as any;
      if (!rating) return { passed: false, message: "❌ Missing '<input type=\"number\">' with id 'rating'." };
      if (rating.getAttribute('min') !== '1' || rating.getAttribute('max') !== '5' || !rating.required) {
        return { passed: false, message: "❌ The rating input must have min=\"1\", max=\"5\", and be required." };
      }
      const textarea = form.querySelector('textarea#comments');
      if (!textarea) return { passed: false, message: "❌ Missing a '<textarea>' with id 'comments'." };
      const button = form.querySelector('button, input[type="submit"]') as any;
      if (!button || (button.textContent?.trim() !== "Submit Review" && button.value !== "Submit Review")) {
        return { passed: false, message: "❌ Missing submit button with text \"Submit Review\"." };
      }
      return { passed: true, message: "✅ Challenge complete! The feedback validation holds strong." };
    }
  },
  {
    id: 4,
    title: "Semantic HTML & Accessibility",
    stage: "html",
    difficulty: "beginner",
    description: "Write cleaner, accessible layouts using HTML5 semantic elements.",
    tutorial: `### Semantic HTML
Before HTML5, developers built websites using generic divisions (\`<div>\`) for everything. This resulted in a messy code soup.

**Semantic HTML** introduces tags that describe their content's meaning:
- \`<header>\`: Introductory content or navigation links at the top.
- \`<nav>\`: Container for navigation menus.
- \`<main>\`: The primary content unique to this document.
- \`<section>\`: A thematic grouping of content.
- \`<article>\`: A self-contained composition (e.g. blog post).
- \`<aside>\`: Sidebar content indirectly related to the main article.
- \`<footer>\`: Author, copyright details.

#### Non-Semantic Elements
- \`<div>\`: A generic divider container with no semantic meaning.
- \`<span>\`: A generic inline text container.

### Why this matters
1. **SEO**: Search engine crawlers prioritize semantic elements when scanning page keywords.
2. **Accessibility**: Screen readers use these tags to allow users to skip straight to the main content.`,
    exampleCode: `<header>
    <h1>CodeForge News</h1>
    <nav>
        <a href="#home">Home</a> | <a href="#about">About</a>
    </nav>
</header>
<main>
    <article>
        <h2>HTML5 is Awesome</h2>
        <p>Semantic tags help structure web documents effectively.</p>
    </article>
</main>
<footer>
    <p>&copy; 2026 CodeForge</p>
</footer>`,
    activityDescription: `### Activity: Refactoring Layouts
Take a generic div-based layout and rewrite it using semantic tags.

#### Objectives:
Ensure your document contains exactly:
1. A \`<header>\` containing:
   - A \`<nav>\` navigation block.
2. A \`<main>\` wrapper.
3. Inside \`<main>\`, a \`<section>\` container.
4. A \`<footer>\` block at the bottom.`,
    activityStarter: `<div id="top-bar">
    <div id="nav-links">
        <a href="#">Dashboard</a>
    </div>
</div>
<div id="content">
    <div class="row">
        <h2>System Status</h2>
        <p>All APIs are fully operational.</p>
    </div>
</div>
<div id="bottom-footer">
    <p>DevPulse Console</p>
</div>`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const header = doc.querySelector('header');
      if (!header) return { passed: false, message: "❌ Missing '<header>' element." };
      const nav = header.querySelector('nav');
      if (!nav) return { passed: false, message: "❌ Missing '<nav>' element inside the '<header>'." };
      const main = doc.querySelector('main');
      if (!main) return { passed: false, message: "❌ Missing '<main>' element." };
      const section = main.querySelector('section');
      if (!section) return { passed: false, message: "❌ Missing '<section>' element inside '<main>'." };
      const footer = doc.querySelector('footer');
      if (!footer) return { passed: false, message: "❌ Missing '<footer>' element." };
      const divTop = doc.querySelector('#top-bar');
      const divContent = doc.querySelector('#content');
      if (divTop || divContent) {
        return { passed: false, message: "❌ Make sure to replace generic <div> elements (like '#top-bar' and '#content') with semantic equivalents." };
      }
      return { passed: true, message: "✅ Perfect! Your page is accessible and easily parsed." };
    },
    challengeDescription: `### Challenge: Blog Post Semantics
Write a clean blog article using:
- An \`<article>\` element.
- Inside it, a \`<header>\` with an \`<h1>\` title.
- A \`<section>\` for body text.
- A \`<footer>\` at the bottom of the article for the author's name.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const article = doc.querySelector('article');
      if (!article) return { passed: false, message: "❌ Missing the '<article>' root element." };
      const header = article.querySelector('header');
      if (!header || !header.querySelector('h1')) {
        return { passed: false, message: "❌ The article must contain a '<header>' with an '<h1>' inside." };
      }
      const section = article.querySelector('section');
      if (!section) return { passed: false, message: "❌ The article must contain a '<section>' for the body." };
      const footer = article.querySelector('footer');
      if (!footer) return { passed: false, message: "❌ The article must contain a '<footer>' for author details." };
      return { passed: true, message: "✅ Challenge complete! The blog post semantics are flawless." };
    }
  },
  {
    id: 5,
    title: "Tables, Media, Embeds",
    stage: "html",
    difficulty: "beginner",
    description: "Display structured data and embed external images, media, and frames.",
    tutorial: `### Tabular Data and Media Embeds
Webpages are more than text and links. Let's learn how to add rich content.

#### HTML Tables
Tables arrange data in rows and columns:
- \`<table>\`: The parent container.
- \`<tr>\` (Table Row): Wraps elements in a horizontal row.
- \`<th>\` (Table Header): Defines columns/header cells.
- \`<td>\` (Table Data): Standard cells containing content.

#### Media Elements
- **Images** (\`<img>\`): Displays images. Requires \`src\` (source) and \`alt\` (alternative text description).
- **Videos** (\`<video>\`): Plays video files directly in the browser with \`controls\`.

#### Iframes (Inline Frames)
An \`<iframe>\` embeds another webpage inside the current page.

### Why this matters
Providing \`alt\` text on images is mandatory for accessibility. If an image fails to load or a screen reader reads the page, the \`alt\` text delivers the context.`,
    exampleCode: `<h2>Server Resource Monitor</h2>
<table border="1">
    <tr>
        <th>Server ID</th>
        <th>Load</th>
    </tr>
    <tr>
        <td>US-East</td>
        <td>14%</td>
    </tr>
</table>

<h2>Data Center Image</h2>
<img src="https://picsum.photos/300/150" alt="Server rack cabinet arrays glowing blue.">`,
    activityDescription: `### Activity: Server Directory Page
Create a status table and image display.

#### Objectives:
1. Create a \`<table>\` containing:
   - A header row with columns: **\"API Name\"** and **\"Status\"**.
   - A secondary data row with cells: **\"JSONPlaceholder\"** and **\"Online\"**.
2. Add an \`<img>\` tag with:
   - \`src=\"https://picsum.photos/200\"\`
   - A non-empty \`alt\` attribute.`,
    activityStarter: `<!-- Create table and image below -->
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const table = doc.querySelector('table');
      if (!table) return { passed: false, message: "❌ Missing the '<table>' element." };
      const headers = table.querySelectorAll('th');
      if (headers.length < 2) return { passed: false, message: "❌ Table must have at least 2 header cells '<th>'." };
      if (headers[0].textContent?.trim() !== "API Name" || headers[1].textContent?.trim() !== "Status") {
        return { passed: false, message: "❌ Table headers must be \"API Name\" and \"Status\"." };
      }
      const tds = table.querySelectorAll('td');
      if (tds.length < 2) return { passed: false, message: "❌ Table must contain a row with at least 2 data cells '<td>'." };
      if (tds[0].textContent?.trim() !== "JSONPlaceholder" || tds[1].textContent?.trim() !== "Online") {
        return { passed: false, message: "❌ Table row data must contain \"JSONPlaceholder\" and \"Online\"." };
      }
      const img = doc.querySelector('img');
      if (!img) return { passed: false, message: "❌ Missing an '<img>' element." };
      if (img.getAttribute('src') !== "https://picsum.photos/200") {
        return { passed: false, message: "❌ Image 'src' must point to 'https://picsum.photos/200'." };
      }
      const alt = img.getAttribute('alt');
      if (!alt || alt.trim() === "") {
        return { passed: false, message: "❌ Image must have a descriptive 'alt' attribute." };
      }
      return { passed: true, message: "✅ Success! Tabular structure and image rendering are perfect." };
    },
    challengeDescription: `### Challenge: Status Hub with Docs
Embed documents alongside a status board. 
Create:
- A table representing API response times (Headers: **\"Endpoint\"**, **\"Latency\"**; Row: **\"/users\"**, **\"120ms\"**).
- An \`<iframe>\` element with \`src=\"about:blank\"\` and a \`title\` attribute for accessibility.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const table = doc.querySelector('table');
      if (!table) return { passed: false, message: "❌ Missing the table." };
      const iframeEl = doc.querySelector('iframe');
      if (!iframeEl) return { passed: false, message: "❌ Missing the '<iframe>' element." };
      if (iframeEl.getAttribute('src') !== "about:blank") {
        return { passed: false, message: "❌ The iframe src must point to 'about:blank'." };
      }
      if (!iframeEl.getAttribute('title')) {
        return { passed: false, message: "❌ The iframe must have a 'title' attribute." };
      }
      return { passed: true, message: "✅ Challenge complete! Media and embeds are fully accessible." };
    }
  },

  // ==========================================
  // STAGE 2: CSS ESSENTIALS (Modules 6-10)
  // ==========================================
  {
    id: 6,
    title: "Selectors, Properties, Cascade",
    stage: "css",
    difficulty: "beginner",
    description: "Target elements and apply styling rules using CSS specificity and selectors.",
    tutorial: `### CSS Basics & Selectors
CSS styles the structural layout of your HTML document. 

#### CSS Ruleset Structure
A CSS rule targets HTML elements and sets style properties:
\`\`\`css
selector {
    property: value;
}
\`\`\`

#### Essential Selectors
1. **Element (Tag) Selector**: Targets all tags of that type.
2. **Class Selector**: Targets elements with a specific class. Starts with a dot (\`.badge\`).
3. **ID Selector**: Targets a single element with a specific ID. Starts with a hash (\`#main-title\`).

#### The Cascade & Specificity
When multiple rules target the same element, the browser decides which styles win using **Specificity**:
- ID Selectors are highly specific (score: 100).
- Class Selectors are moderately specific (score: 10).
- Tag Selectors have low specificity (score: 1).
If specificity scores match, the last rule declared in the stylesheet wins (the **Cascade**).`,
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        h1 { color: slategray; }
        .highlight { background-color: yellow; }
        #primary-heading { color: crimson; }
    </style>
</head>
<body>
    <h1 id="primary-heading" class="highlight">Styling Showcase</h1>
</body>
</html>`,
    activityDescription: `### Activity: Selector Workbench
Add styling rules to target elements using element, class, and ID selectors.

#### Objectives:
Write styles inside a \`<style>\` tag in the head:
1. Target the \`<h1>\` tag and set its text color to **\`rgb(0, 128, 128)\`**.
2. Target the class \`.badge\` and set its background-color to **\`rgb(240, 240, 240)\`**.
3. Target the element with ID \`#main-title\` and set its font-size to **\`32px\`**.`,
    activityStarter: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Write selectors here */
    </style>
</head>
<body>
    <h1 id="main-title">Forge Console</h1>
    <span class="badge">API V1</span>
</body>
</html>`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const h1 = doc.querySelector('h1');
      const badge = doc.querySelector('.badge');
      if (!h1 || !badge) return { passed: false, message: "❌ HTML structure modified incorrectly." };
      const h1Style = window.getComputedStyle(h1);
      const badgeStyle = window.getComputedStyle(badge);
      if (h1Style.color !== 'rgb(0, 128, 128)') {
        return { passed: false, message: "❌ <h1> tag color must be 'rgb(0, 128, 128)'. Currently: " + h1Style.color };
      }
      if (badgeStyle.backgroundColor !== 'rgb(240, 240, 240)') {
        return { passed: false, message: "❌ Class '.badge' background-color must be 'rgb(240, 240, 240)'. Currently: " + badgeStyle.backgroundColor };
      }
      if (h1Style.fontSize !== '32px') {
        return { passed: false, message: "❌ Element '#main-title' font-size must be '32px'. Currently: " + h1Style.fontSize };
      }
      return { passed: true, message: "✅ Success! Selectors are applied correctly." };
    },
    challengeDescription: `### Challenge: Specifying Specificity
Modify a template with the following properties:
- Tag selector \`p\` color set to \`rgb(0, 0, 0)\`
- Class selector \`.text-muted\` color set to \`rgb(128, 128, 128)\`
- ID selector \`#intro\` color set to \`rgb(255, 0, 0)\`
Ensure they are declared in a way that respects specificity.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const p = doc.querySelector('p#intro.text-muted');
      if (!p) return { passed: false, message: "❌ Paragraph with id 'intro' and class 'text-muted' not found." };
      const pStyle = window.getComputedStyle(p);
      if (pStyle.color !== 'rgb(255, 0, 0)') {
        return { passed: false, message: "❌ ID Selector style did not override correctly. Color must be red (rgb(255, 0, 0))." };
      }
      return { passed: true, message: "✅ Challenge complete! Specificity cascade behaves as expected." };
    }
  },
  {
    id: 7,
    title: "Box Model & Layout Basics",
    stage: "css",
    difficulty: "beginner",
    description: "Control layout dimensions using margins, borders, padding, and box-sizing rules.",
    tutorial: `### The CSS Box Model
Every element in HTML is represented as a rectangular box. To design layouts, you must master the **Box Model**:
1. **Content**: The core text or image.
2. **Padding**: Spacing *inside* the border, around the content.
3. **Border**: A line wrapping the padding and content.
4. **Margin**: Spacing *outside* the border, separating elements.

#### Box Sizing
By default, adding padding and border increases an element's total width.
Set **\`box-sizing: border-box;\`** to ensure the width property sets the total outer width, automatically adjusting the content area.

#### Element Display
- **\`block\`**: Takes up full row width (e.g. \`<div>\`, \`<p>\`).
- **\`inline\`**: Wraps tightly around content; ignores width/height.
- **\`inline-block\`**: Sits inline but respects width/height.`,
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .box {
            width: 200px;
            height: 100px;
            padding: 20px;
            border: 5px solid black;
            margin: 15px;
            box-sizing: border-box;
            background-color: lightblue;
        }
    </style>
</head>
<body>
    <div class="box">Border-Box Sandbox</div>
</body>
</html>`,
    activityDescription: `### Activity: Box Dimensions
Configure a card box layout to use borders, padding, margins, and correct box calculations.

#### Objectives:
Write styles for the \`.card-box\` class:
1. Set padding to exactly **\`20px\`**.
2. Set margin to exactly **\`10px\`**.
3. Add a solid border of **\`2px\`** with color **\`rgb(0, 0, 0)\`**.
4. Set the box sizing property to **\`border-box\`**.`,
    activityStarter: `<!DOCTYPE html>
<html>
<head>
    <style>
        .card-box {
            width: 300px;
            /* Write styles here */
        }
    </style>
</head>
<body>
    <div class="card-box">
        <h3>API Log</h3>
        <p>Response returned 200 OK from server.</p>
    </div>
</body>
</html>`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const box = doc.querySelector('.card-box');
      if (!box) return { passed: false, message: "❌ HTML modified incorrectly. Box missing." };
      const computed = window.getComputedStyle(box);
      if (computed.padding !== '20px') {
        return { passed: false, message: "❌ Padding must be set to '20px'. Currently: " + computed.padding };
      }
      if (computed.margin !== '10px') {
        return { passed: false, message: "❌ Margin must be set to '10px'. Currently: " + computed.margin };
      }
      if (computed.borderWidth !== '2px' || !computed.borderColor.includes('0, 0, 0')) {
        return { passed: false, message: "❌ Border must be a '2px' solid black border." };
      }
      if (computed.boxSizing !== 'border-box') {
        return { passed: false, message: "❌ Missing 'box-sizing: border-box'." };
      }
      return { passed: true, message: "✅ Success! Box model spacing is configured correctly." };
    },
    challengeDescription: `### Challenge: Inline-Block Spacing
Design adjacent columns using \`display: inline-block\`.
Style class \`.column\`:
- Set \`display\` to \`inline-block\`
- Set \`width\` to \`45%\`
- Set \`padding\` to \`10px\`
- Set \`box-sizing\` to \`border-box\``,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const col = doc.querySelector('.column');
      if (!col) return { passed: false, message: "❌ Column element not found." };
      const style = window.getComputedStyle(col);
      if (style.display !== 'inline-block') {
        return { passed: false, message: "❌ Display must be 'inline-block'." };
      }
      if (style.boxSizing !== 'border-box') {
        return { passed: false, message: "❌ Box-sizing must be 'border-box'." };
      }
      return { passed: true, message: "✅ Challenge complete! Columns sit side-by-side cleanly." };
    }
  },
  {
    id: 8,
    title: "Flexbox",
    stage: "css",
    difficulty: "intermediate",
    description: "Align, distribute, and stack layout items dynamically with CSS Flexbox.",
    tutorial: `### Flexbox Layouts
CSS Flexbox (Flexible Box Layout) makes it easy to align elements and distribute space among items in a container.

#### Flex Containers vs Flex Items
Declare **\`display: flex;\`** on a parent container. All its direct children become **flex items**.

#### Container Properties
- **\`flex-direction\`**: Sets layout axis (\`row\` or \`column\`).
- **\`justify-content\`**: Aligns items along main axis (\`space-between\`, \`center\`, etc.).
- **\`align-items\`**: Aligns items along cross axis (\`center\`, \`stretch\`, etc.).
- **\`flex-wrap\`**: Wraps items if container space runs out.`,
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .flex-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 100px;
            background-color: #2c3e50;
        }
        .item {
            background-color: #ecf0f1;
            padding: 10px 20px;
        }
    </style>
</head>
<body>
    <div class="flex-container">
        <div class="item">API V1</div>
        <div class="item">V2</div>
    </div>
</body>
</html>`,
    activityDescription: `### Activity: Flex Toolbar
Arrange header items into a horizontal layout using Flexbox.

#### Objectives:
Style the \`.toolbar\` container class:
1. Set \`display\` to **\`flex\`**.
2. Align children along the main axis with space distributed between them (\`justify-content\` set to **\`space-between\`**).
3. Center children vertically along the cross axis (\`align-items\` set to **\`center\`**).`,
    activityStarter: `<!DOCTYPE html>
<html>
<head>
    <style>
        .toolbar {
            border: 1px solid #ccc;
            padding: 10px;
            /* Write styles here */
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <div class="logo">DevPulse Console</div>
        <nav class="links">
            <a href="#">Status</a> | 
            <a href="#">Logs</a>
        </nav>
    </div>
</body>
</html>`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const toolbar = doc.querySelector('.toolbar');
      if (!toolbar) return { passed: false, message: "❌ Toolbar element missing." };
      const computed = window.getComputedStyle(toolbar);
      if (computed.display !== 'flex') {
        return { passed: false, message: "❌ Display must be set to 'flex'." };
      }
      if (computed.justifyContent !== 'space-between') {
        return { passed: false, message: "❌ justify-content must be set to 'space-between'." };
      }
      if (computed.alignItems !== 'center') {
        return { passed: false, message: "❌ align-items must be set to 'center'." };
      }
      return { passed: true, message: "✅ Success! Toolbar elements are distributed using Flexbox." };
    },
    challengeDescription: `### Challenge: Responsive Card Row
Design a container that wraps child elements on smaller widths.
Style \`.card-container\`:
- Set \`display\` to \`flex\`
- Set \`flex-wrap\` to \`wrap\`
- Set \`justify-content\` to \`center\``,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const container = doc.querySelector('.card-container');
      if (!container) return { passed: false, message: "❌ Container element not found." };
      const style = window.getComputedStyle(container);
      if (style.display !== 'flex' || style.flexWrap !== 'wrap' || style.justifyContent !== 'center') {
        return { passed: false, message: "❌ Styles must include: display: flex, flex-wrap: wrap, justify-content: center." };
      }
      return { passed: true, message: "✅ Challenge complete! The card container will wrap responsively." };
    }
  },
  {
    id: 9,
    title: "CSS Grid",
    stage: "css",
    difficulty: "intermediate",
    description: "Design multi-column layout matrices and grid systems using CSS Grid.",
    tutorial: `### CSS Grid Layout
While Flexbox organizes elements in one direction, CSS Grid is designed for **two-dimensional layouts** (rows AND columns simultaneously).

#### Creating Grids
Declare **\`display: grid;\`** on the parent container.
Define grid dimensions using:
- \`grid-template-columns\`: Widths of vertical columns.
- \`gap\`: Spacing between grid cells.
- \`fr\` unit: Represents a fraction of the free space.`,
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
        .grid-item {
            background-color: #3498db;
            color: white;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="grid-item">Card 1</div>
        <div class="grid-item">Card 2</div>
        <div class="grid-item">Card 3</div>
    </div>
</body>
</html>`,
    activityDescription: `### Activity: Dashboard Panel Grid
Build a responsive three-column grid layout for a system dashboard.

#### Objectives:
Style the \`.grid-container\` class:
1. Set \`display\` to **\`grid\`**.
2. Define three equal-width columns using **\`grid-template-columns: repeat(3, 1fr)\`** or **\`grid-template-columns: 1fr 1fr 1fr\`**.
3. Set column and row gaps to exactly **\`15px\`** (using the **\`gap\`** shorthand).`,
    activityStarter: `<!DOCTYPE html>
<html>
<head>
    <style>
        .grid-container {
            /* Write grid layout styles here */
        }
        .panel {
            border: 1px solid #ddd;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="panel">Users Load</div>
        <div class="panel">API Requests</div>
        <div class="panel">Response Latency</div>
    </div>
</body>
</html>`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const grid = doc.querySelector('.grid-container');
      if (!grid) return { passed: false, message: "❌ Grid container element missing." };
      const computed = window.getComputedStyle(grid);
      if (computed.display !== 'grid') {
        return { passed: false, message: "❌ Display property must be set to 'grid'." };
      }
      const gridColumns = computed.gridTemplateColumns;
      // Chrome resolves repeat(3, 1fr) to actual pixel values (e.g. 100px 100px 100px)
      // Check for three columns
      const cols = gridColumns.split(' ').filter(Boolean);
      if (cols.length !== 3) {
        return { passed: false, message: "❌ Grid must define exactly 3 columns (grid-template-columns). Got: " + gridColumns };
      }
      if (computed.gap !== '15px' && computed.columnGap !== '15px') {
        return { passed: false, message: "❌ Gap property must be set to '15px'. Got: " + computed.gap };
      }
      return { passed: true, message: "✅ Success! Dashboards panels are arranged inside a 2D layout grid." };
    },
    challengeDescription: `### Challenge: Sidebar Grid Span
Create a grid structure with a sidebar and a main section.
Style \`.layout-grid\`:
- Set \`display: grid\`
- Set columns to: \`200px 1fr\`
- Spacing gap: \`10px\``,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const grid = doc.querySelector('.layout-grid');
      if (!grid) return { passed: false, message: "❌ Layout grid not found." };
      const style = window.getComputedStyle(grid);
      if (style.display !== 'grid') return { passed: false, message: "❌ Display must be grid." };
      const cols = style.gridTemplateColumns.split(' ');
      if (cols[0] !== '200px') return { passed: false, message: "❌ First column width must be exactly 200px. Got: " + cols[0] };
      if (style.gap !== '10px' && style.columnGap !== '10px') return { passed: false, message: "❌ Grid gap must be 10px." };
      return { passed: true, message: "✅ Challenge complete! The layout now supports a fixed-width sidebar." };
    }
  },
  {
    id: 10,
    title: "Responsive Design & Media Queries",
    stage: "css",
    difficulty: "intermediate",
    description: "Write responsive CSS stylesheets using media queries that rearrange elements on smaller screens.",
    tutorial: `### Responsive Web Design
Responsive design ensures your web application looks great on all screens: mobile devices, tablets, and wide desktop displays.

#### Media Queries
Media queries are CSS blocks that run only when target viewport rules match (e.g. screen width thresholds):
\`\`\`css
/* Desktop default styling */
.sidebar { width: 300px; }

/* Styles applied ONLY on viewports 600px wide or smaller */
@media (max-width: 600px) {
    .sidebar {
        display: none; /* Hide navigation sidebar on mobile */
    }
}
\`\`\`

#### Responsive Viewport Meta
To allow devices to calculate correct media query bounds, always include the mobile viewport meta tag in the HTML head (covered in Module 1).

### Why this matters
More than 55% of global web traffic originates from mobile devices. If your page layout doesn't respond to small screens, user churn skyrockets.`,
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; margin: 20px; }
        .box {
            padding: 20px;
            background-color: lightgreen;
            text-align: center;
        }
        
        /* Mobile-first override */
        @media (max-width: 600px) {
            .box {
                background-color: lightcoral;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="box">Resize the panel view to observe styling changes!</div>
</body>
</html>`,
    activityDescription: `### Activity: Mobile Layout Optimizer
Create a media query stylesheet that optimizes navigation views on mobile widths.

#### Objectives:
Write styles inside the \`<style>\` tags:
1. Declare a media query for a max-width threshold of **\`600px\`** (using **\`@media (max-width: 600px)\`**).
2. Inside the media query block:
   - Target the class **\`.sidebar\`** and set it to **\`display: none\`**.
   - Target the class **\`.main-view\`** and set its width to **\`100%\`**.`,
    activityStarter: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; display: flex; }
        .sidebar {
            width: 250px;
            height: 100vh;
            background-color: #222;
            color: white;
        }
        .main-view {
            width: calc(100% - 250px);
            padding: 20px;
        }
        
        /* Write media query below */
        
    </style>
</head>
<body>
    <div class="sidebar">Navigation Panel</div>
    <div class="main-view">Content Panel</div>
</body>
</html>`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const styleSheets = doc.styleSheets;
      let hasMediaQuery = false;
      let hidesSidebar = false;
      let expandsMain = false;
      for (let sheet of styleSheets) {
        try {
          const rules = sheet.cssRules || (sheet as any).rules;
          for (let rule of rules) {
            if ((rule as any).media && (rule as any).media.mediaText.includes('max-width: 600px')) {
              hasMediaQuery = true;
              const subRules = (rule as any).cssRules;
              for (let sub of subRules) {
                if (sub.selectorText === '.sidebar' && sub.style.display === 'none') {
                  hidesSidebar = true;
                }
                if (sub.selectorText === '.main-view' && sub.style.width === '100%') {
                  expandsMain = true;
                }
              }
            }
          }
        } catch (e: any) {}
      }
      if (!hasMediaQuery) {
        return { passed: false, message: "❌ Missing media query for screen width '@media (max-width: 600px)'." };
      }
      if (!hidesSidebar) {
        return { passed: false, message: "❌ Inside media query, style for '.sidebar' must be set to 'display: none'." };
      }
      if (!expandsMain) {
        return { passed: false, message: "❌ Inside media query, style for '.main-view' must set 'width: 100%'." };
      }
      return { passed: true, message: "✅ Success! Media query successfully hides navigation and expands workspace." };
    },
    challengeDescription: `### Challenge: Responsive Flex Direction
Create a layout that shifts flex orientation on devices.
Style the \`.nav-grid\` class:
- Set \`display: flex\` and \`flex-direction: row\` by default.
- Create a media query for \`max-width: 768px\`.
- Inside the query, set \`flex-direction: column\` for \`.nav-grid\`.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const styleSheets = doc.styleSheets;
      let pass = false;
      for (let sheet of styleSheets) {
        try {
          const rules = sheet.cssRules || (sheet as any).rules;
          for (let rule of rules) {
            if ((rule as any).media && (rule as any).media.mediaText.includes('768px')) {
              const subRules = (rule as any).cssRules;
              for (let sub of subRules) {
                if (sub.selectorText === '.nav-grid' && sub.style.flexDirection === 'column') {
                  pass = true;
                }
              }
            }
          }
        } catch(e: any) {}
      }
      if (!pass) return { passed: false, message: "❌ Missing media query changing flex-direction to column at 768px viewport limits." };
      return { passed: true, message: "✅ Challenge complete! Navigation bar is now fully mobile-responsive." };
    }
  },

  // ==========================================
  // STAGE 3: JAVASCRIPT FUNDAMENTALS & DOM (Modules 11-19)
  // ==========================================
  {
    id: 11,
    title: "JavaScript Variables & Data Types",
    stage: "javascript",
    difficulty: "beginner",
    description: "Store data and perform basic calculations using JavaScript variables.",
    tutorial: `### JavaScript Variables & Types
JavaScript (JS) is the programming language that makes web pages interactive. It allows you to store data, make calculations, and manipulate elements on the page.

#### Storing Data
Variables are containers for storing data values. In modern JavaScript, we declare variables using:
- \`let\`: Declares a variable that can be re-assigned later.
- \`const\`: Declares a read-only constant variable that cannot be re-assigned.
- \`var\`: An older way to declare variables (avoid in modern code).

#### Basic Data Types
1. **Numbers**: Numeric values (e.g. \`5\`, \`19.99\`).
2. **Strings**: Text wrapped in quotes (e.g. \`\"Larenz\"\`, \`'Code'\`).
3. **Booleans**: True or false values (\`true\`, \`false\`).

#### String Concatenation & Template Literals
You can join strings using the \`+\` operator or template literals (\` \` \`) with \`\${variable}\`:
\`\`\`javascript
const name = "Larenz";
console.log(\`My name is: \${name}\`); // "My name is: Larenz"
\`\`\``,
    exampleCode: `const coffee = 5;
const bagels = 3;
const soup = 9;
let cost = coffee + (bagels * 2) + soup;
console.log(\`Initial food cost: \$\${cost}\`);

const tax = cost * 0.1;
console.log(\`Tax (10%): \$\${tax}\`);

const total = cost + tax;
console.log(\`Total cost: \$\${total}\`);`,
    activityDescription: `### Activity: Food Cost Calculation
Write a script that creates variables to calculate product totals.

#### Objectives:
1. Declare a variable named **\`username\`** using \`const\` and set it to **\`\"Larenz\"\`**.
2. Declare variables **\`coffeePrice\`** (value **\`5\`**), **\`bagelPrice\`** (value **\`3\`**), and **\`soupPrice\`** (value **\`9\`**) using \`const\`.
3. Declare a variable named **\`totalCost\`** using \`let\` and calculate its value by summing \`coffeePrice\`, double of \`bagelPrice\` (2 bagels), and \`soupPrice\`.
4. Calculate a 10% tax rate off \`totalCost\` and save it in a variable named **\`tax\`** (formula: \`totalCost * 0.1\`).
5. Store the final value in a variable named **\`finalBill\`** (sum of \`totalCost\` and \`tax\`).`,
    activityStarter: `// Write your variables below
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script Error: " + err.message };
      }
      const username = iframe.contentWindow.username;
      const coffeePrice = iframe.contentWindow.coffeePrice;
      const bagelPrice = iframe.contentWindow.bagelPrice;
      const soupPrice = iframe.contentWindow.soupPrice;
      const totalCost = iframe.contentWindow.totalCost;
      const tax = iframe.contentWindow.tax;
      const finalBill = iframe.contentWindow.finalBill;

      if (username === undefined) return { passed: false, message: "❌ Missing variable 'username'." };
      if (username !== "Larenz") return { passed: false, message: "❌ 'username' must be set to exactly \"Larenz\"." };
      if (coffeePrice !== 5 || bagelPrice !== 3 || soupPrice !== 9) {
        return { passed: false, message: "❌ Make sure variables 'coffeePrice', 'bagelPrice', and 'soupPrice' are initialized to 5, 3, and 9 respectively." };
      }
      if (totalCost !== 20) return { passed: false, message: "❌ 'totalCost' must equal coffee + 2 * bagel + soup (20). Got: " + totalCost };
      if (tax !== 2) return { passed: false, message: "❌ 'tax' must equal totalCost * 0.1 (2). Got: " + tax };
      if (finalBill !== 22) return { passed: false, message: "❌ 'finalBill' must equal totalCost + tax (22). Got: " + finalBill };

      return { passed: true, message: "✅ Success! Variables initialized and calculated correctly." };
    },
    challengeDescription: `### Challenge: Cart Quantity Tracker
Simulate a shopping cart quantity tracker using variables.
- Declare a variable **\`cartQuantity\`** using \`let\` initialized to **\`0\`**.
- Increase it by **\`5\`** (e.g. \`cartQuantity += 5\`).
- Decrease it by **\`2\`**.
- Store the final value in a constant variable named **\`finalQuantity\`** using \`const\`.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Script error: " + e.message };
      }
      const cartQuantity = iframe.contentWindow.cartQuantity;
      const finalQuantity = iframe.contentWindow.finalQuantity;
      if (cartQuantity === undefined) return { passed: false, message: "❌ Missing variable 'cartQuantity'." };
      if (finalQuantity === undefined) return { passed: false, message: "❌ Missing variable 'finalQuantity'." };
      if (finalQuantity !== 3) return { passed: false, message: "❌ 'finalQuantity' must equal exactly 3 (0 + 5 - 2). Got: " + finalQuantity };
      return { passed: true, message: "✅ Challenge complete! Cart variables managed successfully." };
    }
  },
  {
    id: 12,
    title: "Control Flow & Booleans",
    stage: "javascript",
    difficulty: "beginner",
    description: "Write comparisons and conditional branches using if-else logic and logical operators.",
    tutorial: `### Control Flow & Conditional Statements
Conditional logic allows your program to make decisions based on inputs or conditions.

#### Comparison Operators
- \`===\` (Strictly Equal to): Compares both value and type.
- \`!==\` (Not Equal to): Check inequality.
- \`>\`, \`<\`, \`>=\`, \`<=\`: Numeric bounds.

#### Logical Operators
- \`&&\` (AND): Returns true if BOTH sides are true.
- \`||\` (OR): Returns true if AT LEAST ONE side is true.
- \`!\` (NOT): Reverses the boolean value.

#### If Statements & Else
\`\`\`javascript
const randomNumber = Math.random(); // returns a value between 0 and 1
if (randomNumber < 0.5) {
    console.log("Heads!");
} else {
    console.log("Tails!");
}
\`\`\``,
    exampleCode: `const age = 16;
const hasId = true;

if (age >= 18 || hasId) {
    console.log("Access Granted!");
} else {
    console.log("Access Denied!");
}

const statusMsg = age >= 18 ? "Permitted" : "Restricted";
console.log("Status:", statusMsg);`,
    activityDescription: `### Activity: Cart Boundaries Validator
Create cart quantity logic that prevents overflowing (> 10 items) or underflowing (< 0 items).

#### Objectives:
1. Initialize a variable **\`cartQuantity\`** using \`let\` to **\`9\`**.
2. Write an \`if\` statement to validate adding **\`2\`** items:
   - If \`cartQuantity + 2 > 10\`, output log **\`\"The Cart is full\"\`**.
   - Otherwise, update \`cartQuantity += 2\` and log **\`\"Cart Quantity: \" + cartQuantity\`**.`,
    activityStarter: `// Write your cart logic below:
let cartQuantity = 9;
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const cartQuantity = iframe.contentWindow.cartQuantity;
      if (cartQuantity === undefined) {
        return { passed: false, message: "❌ Missing 'cartQuantity' variable." };
      }
      const findFullLog = logs.some(l => l.message.toLowerCase().includes("cart is full"));
      if (!findFullLog) {
        return { passed: false, message: "❌ Expected console log to say \"The Cart is full\" since 9 + 2 exceeds 10." };
      }
      if (cartQuantity !== 9) {
        return { passed: false, message: "❌ cartQuantity should remain 9 since the limit was exceeded." };
      }
      return { passed: true, message: "✅ Success! Cart boundary rules verified." };
    },
    challengeDescription: `### Challenge: Rock Paper Scissors Logic
Create a variable **\`playerMove\`** set to **\`\"rock\"\`**, and **\`computerMove\`** set to **\`\"scissors\"\`**.
Write an if-else structure that sets a string variable **\`result\`** to:
- **\`\"Win\"\`** if player beats computer (rock beats scissors, paper beats rock, scissors beats paper).
- **\`\"Lose\"\`** if computer beats player.
- **\`\"Tie\"\`** if both moves are equal.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const playerMove = iframe.contentWindow.playerMove;
      const computerMove = iframe.contentWindow.computerMove;
      const result = iframe.contentWindow.result;
      if (playerMove !== "rock") return { passed: false, message: "❌ 'playerMove' must be set to \"rock\"." };
      if (computerMove !== "scissors") return { passed: false, message: "❌ 'computerMove' must be set to \"scissors\"." };
      if (result !== "Win") return { passed: false, message: "❌ 'result' must equal \"Win\" for rock vs scissors. Got: " + result };
      return { passed: true, message: "✅ Challenge complete! Game engine rules resolved successfully." };
    }
  },
  {
    id: 13,
    title: "Functions & Arrow Functions",
    stage: "javascript",
    difficulty: "beginner",
    description: "Write reusable blocks of code and shorthand arrow functions.",
    tutorial: `### JavaScript Functions
Functions package a section of reusable code that can be called repeatedly with different inputs.

#### Function Declarations
\`\`\`javascript
function calculateSum(a, b) {
    return a + b;
}
console.log(calculateSum(5, 10)); // 15
\`\`\`

#### Arrow Functions
A shorter syntax introduced in ES6:
\`\`\`javascript
const multiply = (x, y) => x * y;
console.log(multiply(3, 4)); // 12
\`\`\``,
    exampleCode: `// Helper to pick a random computer move
function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1/3) return "rock";
    if (randomNumber < 2/3) return "paper";
    return "scissors";
}
console.log("Computer move is:", pickComputerMove());`,
    activityDescription: `### Activity: Temperature Converter
Write a function that handles Celsius and Fahrenheit unit conversions.

#### Objectives:
1. Create a function named **\`convertTemperature\`**.
2. It should accept two parameters: **\`temp\`** (number) and **\`toUnit\`** (string: \`\"C\"\` or \`\"F\"\`).
3. If \`toUnit\` is **\`\"F\"\`**, convert \`temp\` from Celsius to Fahrenheit and return it. Formula: \`temp * 9 / 5 + 32\`.
4. If \`toUnit\` is **\`\"C\"\`**, convert \`temp\` from Fahrenheit to Celsius and return it. Formula: \`(temp - 32) * 5 / 9\`.`,
    activityStarter: `// Declare convertTemperature below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const convert = iframe.contentWindow.convertTemperature;
      if (typeof convert !== 'function') {
        return { passed: false, message: "❌ Missing function 'convertTemperature'." };
      }
      if (convert(25, "F") !== 77) return { passed: false, message: "❌ 25°C convert to 'F' must equal 77." };
      if (convert(77, "C") !== 25) return { passed: false, message: "❌ 77°F convert to 'C' must equal 25." };
      return { passed: true, message: "✅ Success! Temperature conversion logic is correct." };
    },
    challengeDescription: `### Challenge: Refactored Game Engine
Create an arrow function named **\`playGame\`** that takes a parameter **\`playerMove\`** and:
1. Internally determines a computer move: returns **\`\"rock\"\`** if \`Math.random() < 0.5\` else **\`\"scissors\"\`**.
2. Compares the moves and returns string:
   - **\`\"You win!\"\`** (if player rock and computer scissors)
   - **\`\"Tie.\"\`** (if player and computer moves match)
   - **\`\"You lose.\"\`** otherwise.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const playGame = iframe.contentWindow.playGame;
      if (typeof playGame !== 'function') return { passed: false, message: "❌ Missing playGame function." };
      const winCheck = playGame("rock"); // could random, test multiple times
      for (let i = 0; i < 10; i++) {
        const res = playGame("rock");
        if (res !== "You win!" && res !== "Tie.") {
          return { passed: false, message: "❌ Playing 'rock' should only yield 'You win!' or 'Tie.' since computer is rock/scissors." };
        }
      }
      return { passed: true, message: "✅ Challenge complete! Game engine successfully wrapped in a reusable arrow function." };
    }
  },
  {
    id: 14,
    title: "JavaScript Objects & LocalStorage",
    stage: "javascript",
    difficulty: "beginner",
    description: "Manage complex records and save scoring data across reloads using objects and LocalStorage.",
    tutorial: `### JavaScript Objects & Storage
Objects group properties (variables) and methods (functions) inside a single container.

#### Creating Objects
\`\`\`javascript
const user = {
    name: "Larenz",
    role: "Admin",
    greet() {
        return \`Hello, my name is \${this.name}.\`;
    }
};
\`\`\`

#### Persisting State (LocalStorage)
Browsers let you save text strings between page reloads using \`localStorage\`.
- Save: \`localStorage.setItem('key', 'stringValue')\`
- Load: \`localStorage.getItem('key')\`
Since objects aren't strings, convert them first:
- Object to string: \`JSON.stringify(object)\`
- String to Object: \`JSON.parse(string)\``,
    exampleCode: `const defaultScore = { wins: 0, losses: 0 };
localStorage.setItem('score', JSON.stringify(defaultScore));

const saved = JSON.parse(localStorage.getItem('score'));
console.log("Saved wins:", saved.wins);`,
    activityDescription: `### Activity: Scoreboard Storage Manager
Model a scoreboard object that saves score values to LocalStorage.

#### Objectives:
1. Create a global object named **\`score\`** with number properties: **\`wins\`**, **\`losses\`**, and **\`ties\`** initialized to **\`0\`**.
2. Add a method to the object named **\`incrementWin\`** that:
   - Increments \`this.wins\` by 1.
   - Saves the updated \`score\` object to \`localStorage\` under the key **\`\"scoreboard\"\`** (be sure to stringify it!).
3. Add a method named **\`resetScore\`** that:
   - Resets \`wins\`, \`losses\`, and \`ties\` to 0.
   - Saves/overwrites the reset \`score\` object to \`localStorage\` under key **\`\"scoreboard\"\`**.`,
    activityStarter: `// Define score object below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.localStorage.clear();
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const score = iframe.contentWindow.score;
      if (score === undefined) return { passed: false, message: "❌ Missing object variable 'score'." };
      if (score.wins === undefined || score.losses === undefined || score.ties === undefined) {
        return { passed: false, message: "❌ Object must contain properties 'wins', 'losses', and 'ties'." };
      }
      if (typeof score.incrementWin !== 'function' || typeof score.resetScore !== 'function') {
        return { passed: false, message: "❌ Object must contain methods 'incrementWin()' and 'resetScore()'." };
      }
      
      score.incrementWin();
      if (score.wins !== 1) return { passed: false, message: "❌ incrementWin() did not increase wins to 1." };
      
      const savedStr = iframe.contentWindow.localStorage.getItem("scoreboard");
      if (!savedStr) return { passed: false, message: "❌ scoreboard not found in localStorage after incrementing." };
      
      const parsed = JSON.parse(savedStr);
      if (parsed.wins !== 1) return { passed: false, message: "❌ The saved object in localStorage does not reflect updated wins." };
      
      score.resetScore();
      if (score.wins !== 0) return { passed: false, message: "❌ resetScore() did not reset wins to 0." };
      
      const savedStr2 = iframe.contentWindow.localStorage.getItem("scoreboard");
      const parsed2 = JSON.parse(savedStr2 || '{}');
      if (parsed2.wins !== 0) return { passed: false, message: "❌ localStorage did not reflect reset scoreboard." };

      return { passed: true, message: "✅ Success! Object scoreboard manages and persists state successfully." };
    },
    challengeDescription: `### Challenge: Digital Wallet Tracker
Create a **\`wallet\`** object that tracks funds:
- Property **\`balance\`** initialized to **\`100\`** (number).
- Method **\`spendFunds(amount)\`**:
  - Decreases \`balance\` and returns the new balance if enough funds exist.
  - If \`balance\` is less than \`amount\`, returns string **\`\"Insufficient funds\"\`** (without changing balance).`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const wallet = iframe.contentWindow.wallet;
      if (!wallet) return { passed: false, message: "❌ Missing 'wallet' object." };
      if (wallet.balance === undefined) return { passed: false, message: "❌ Wallet must have a 'balance' property." };
      const res = wallet.spendFunds(200);
      if (res !== "Insufficient funds" || wallet.balance !== 100) {
        return { passed: false, message: "❌ spendFunds must block over-drafting and return \"Insufficient funds\"." };
      }
      wallet.spendFunds(30);
      if (wallet.balance !== 70) return { passed: false, message: "❌ balance should be 70 after spending 30." };
      return { passed: true, message: "✅ Challenge complete! Wallet state manages safely." };
    }
  },
  {
    id: 15,
    title: "JavaScript Classes & OOP",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Write object blueprints using classes, constructors, methods, and inherit fields using subclasses.",
    tutorial: `### Object-Oriented Programming & Classes
Object-Oriented Programming (OOP) is a programming style that organizes code into structures called objects. Classes are blueprints for creating objects.

#### Creating Classes
We define a class using the \`class\` keyword, with a \`constructor\` method that initializes properties:
\`\`\`javascript
class Person {
    constructor(firstName, lastName, birthYear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = new Date(birthYear);
    }
    
    // Method inside class
    getFullName() {
        return \`\${this.firstName} \${this.lastName}\`;
    }
}
\`\`\`

#### Instantiation
We create new instances using the \`new\` keyword:
\`\`\`javascript
const person1 = new Person('Mark', 'Tabotabo', '11-15-2001');
console.log(person1.getFullName()); // "Mark Tabotabo"
\`\`\`

#### Class Inheritance
A subclass can inherit properties and methods from a parent class using \`extends\`. Use \`super()\` inside the constructor to call the parent class constructor:
\`\`\`javascript
class Student extends Person {
    constructor(firstName, lastName, birthYear, major) {
        super(firstName, lastName, birthYear); // Calls parent constructor
        this.major = major;
    }
}
\`\`\``,
    exampleCode: `class Vehicle {
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
    getInfo() {
        return \`\${this.brand} (\${this.year})\`;
    }
}

class Car extends Vehicle {
    constructor(brand, year, model) {
        super(brand, year);
        this.model = model;
    }
    getFullSpecs() {
        return \`\${this.getInfo()} - \${this.model}\`;
    }
}

const myCar = new Car('Toyota', 2022, 'Supra');
console.log(myCar.getFullSpecs());`,
    activityDescription: `### Activity: Person Class Definition
Implement a class representing a profile blueprint with helper methods.

#### Objectives:
1. Declare a class named **\`Person\`**.
2. The constructor should accept three arguments: **\`firstName\`** (string), **\`lastName\`** (string), and **\`birthYear\`** (string date representation e.g. '11-15-2001').
3. Store \`birthYear\` as a JS Date object: \`this.birthYear = new Date(birthYear)\`.
4. Add method **\`getBirthYear()\`** that returns the four-digit year (using \`this.birthYear.getFullYear()\`).
5. Add method **\`getFullName()\`** that returns \`firstName\` and \`lastName\` separated by a space.`,
    activityStarter: `// Declare Person class below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(err: any) {
        return { passed: false, message: "❌ Class syntax error: " + err.message };
      }
      const Person = iframe.contentWindow.Person;
      if (!Person || typeof Person !== 'function') {
        return { passed: false, message: "❌ Missing class 'Person'." };
      }
      try {
        const p = new Person("Mark", "Tabotabo", "11-15-2001");
        if (p.firstName !== "Mark" || p.lastName !== "Tabotabo") {
          return { passed: false, message: "❌ Properties 'firstName' and 'lastName' must be initialized in the constructor." };
        }
        if (typeof p.getBirthYear !== 'function' || p.getBirthYear() !== 2001) {
          return { passed: false, message: "❌ getBirthYear() must return the 4-digit year of birth. Expected 2001, got: " + p.getBirthYear() };
        }
        if (typeof p.getFullName !== 'function' || p.getFullName() !== "Mark Tabotabo") {
          return { passed: false, message: "❌ getFullName() must return the combined first and last names." };
        }
      } catch(e: any) {
        return { passed: false, message: "❌ Error during class instantiation: " + e.message };
      }
      return { passed: true, message: "✅ Success! Person class blueprint works perfectly." };
    },
    challengeDescription: `### Challenge: Employee Subclass Inheritance
Create a subclass named **\`Employee\`** that extends **\`Person\`**:
- Constructor should accept \`firstName\`, \`lastName\`, \`birthYear\`, and a new parameter **\`salary\`** (number).
- Call \`super()\` to pass the parent arguments.
- Store \`salary\` inside property \`this.salary\`.
- Add method **\`getSalary()\`** returning \`this.salary\`.
- Override method **\`getFullName()\`** to return: **\`\"Employee: \" + super.getFullName()\`**.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Class syntax error: " + e.message };
      }
      const Employee = iframe.contentWindow.Employee;
      if (!Employee) return { passed: false, message: "❌ Missing class 'Employee'." };
      try {
        const e = new Employee("Jane", "Doe", "05-10-1995", 50000);
        if (e.firstName !== "Jane" || e.getSalary() !== 50000) {
          return { passed: false, message: "❌ Subclass constructor must forward fields and store salary." };
        }
        if (e.getBirthYear() !== 1995) {
          return { passed: false, message: "❌ Subclass did not inherit getBirthYear() correctly from parent." };
        }
        if (e.getFullName() !== "Employee: Jane Doe") {
          return { passed: false, message: "❌ getFullName() must be overridden to prefix \"Employee: \". Got: " + e.getFullName() };
        }
      } catch(err: any) {
        return { passed: false, message: "❌ Error during subclass validation: " + err.message };
      }
      return { passed: true, message: "✅ Challenge complete! Subclass inheritance and overrides validated successfully." };
    }
  },
  {
    id: 16,
    title: "Arrays & Loops",
    stage: "javascript",
    difficulty: "beginner",
    description: "Store collections in arrays and iterate over items using loops.",
    tutorial: `### Arrays & Loops
Arrays store lists of values under a single name, and loops let you execute a block of code repeatedly.

#### Arrays
Create an array using square brackets:
\`\`\`javascript
const list = ["make dinner", "wash dishes"];
console.log(list[0]); // Access first element: "make dinner"
list.push("wash car"); // Add item to end
\`\`\`

#### Loops
Loops run code blocks multiple times. We can use a \`for\` loop to loop through array indices:
\`\`\`javascript
for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
}
\`\`\``,
    exampleCode: `const scores = [85, 90, 78];
scores.push(92);

console.log("Scores length:", scores.length);

for (let i = 0; i < scores.length; i++) {
    console.log(\`Score \${i + 1}: \${scores[i]}\`);
}`,
    activityDescription: `### Activity: Array Element Accumulator
Iterate array collections using loops to build totals.

#### Objectives:
1. Create a function named **\`sumArray\`**.
2. It should take a single parameter **\`numbers\`** (an array of numbers).
3. Using a \`for\` loop, calculate the sum of all numbers in the array.
4. **Return** the total sum (returns \`0\` if array is empty).`,
    activityStarter: `// Write your sumArray function below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const sumArray = iframe.contentWindow.sumArray;
      if (typeof sumArray !== 'function') {
        return { passed: false, message: "❌ Missing function 'sumArray'." };
      }
      if (sumArray([1, 2, 3]) !== 6) return { passed: false, message: "❌ sumArray([1, 2, 3]) must return 6." };
      if (sumArray([10, -2, 5]) !== 13) return { passed: false, message: "❌ sumArray([10, -2, 5]) must return 13." };
      if (sumArray([]) !== 0) return { passed: false, message: "❌ sumArray([]) must return 0." };
      return { passed: true, message: "✅ Success! Array sum accumulator handles inputs correctly." };
    },
    challengeDescription: `### Challenge: Todo HTML Accumulator
Write a function **\`renderTodos(todoList)\`** that:
- Accepts an array of strings (todo names).
- Loops through the array and wraps each todo item in a paragraph tag (e.g. \`\"<p>\" + todo + \"</p>\"\`).
- Accumulates these into a single string.
- Returns the complete HTML string.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const renderTodos = iframe.contentWindow.renderTodos;
      if (typeof renderTodos !== 'function') return { passed: false, message: "❌ Missing renderTodos function." };
      const res = renderTodos(["make dinner", "wash dishes"]);
      if (res.replace(/\s+/g, '') !== "<p>makedinner</p><p>washdishes</p>") {
        return { passed: false, message: "❌ HTML rendering incorrect. Expected '<p>make dinner</p><p>wash dishes</p>', got: " + res };
      }
      return { passed: true, message: "✅ Challenge complete! Loop HTML accumulator resolves correctly." };
    }
  },
  {
    id: 17,
    title: "DOM Basics & Event Listeners",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Connect code events with web UI elements using DOM selection and event listeners.",
    tutorial: `### The Document Object Model (DOM)
The DOM is the browser's representation of a webpage. JavaScript uses it to change page elements dynamically.

#### Selecting Elements
- **\`document.querySelector(selector)\`**: Selects the first element matching a CSS selector.

#### Manipulating Content & Styles
\`\`\`javascript
const title = document.querySelector("h1");
title.textContent = "New Heading"; // change text
title.style.color = "blue"; // change CSS
\`\`\`

#### Listening to Events
Event listeners detect user interactions:
\`\`\`javascript
const button = document.querySelector("button");
button.addEventListener("click", () => {
    console.log("Button clicked!");
});
\`\`\``,
    exampleCode: `<!-- This code runs inside the sandbox browser context -->
<button class="sub">Subscribe</button>

<script>
  const sub = document.querySelector('.sub');
  sub.addEventListener('click', () => {
      if (sub.textContent === 'Subscribe') {
          sub.textContent = 'Subscribed';
          sub.style.backgroundColor = 'gray';
      } else {
          sub.textContent = 'Subscribe';
          sub.style.backgroundColor = 'blue';
      }
  });
</script>`,
    activityDescription: `### Activity: Click Counter
Build an interactive counter using DOM elements and click listeners.

#### Objectives:
1. Create a span element in the HTML with **\`id=\"counter\"\`** containing the initial text **\`\"0\"\`**.
2. Create a button element with **\`id=\"increment-btn\"\`** and text **\`\"+\"\`**.
3. Write a script to listen to clicks on \`#increment-btn\`:
   - Each click should parse the current number inside \`#counter\`, increment it by 1, and write the new total back as \`textContent\`.`,
    activityStarter: `<span id="counter">0</span>
<button id="increment-btn">+</button>

<script>
  // Write your DOM code here
</script>`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const counter = doc.querySelector('#counter');
      const btn = doc.querySelector('#increment-btn');
      if (!counter) return { passed: false, message: "❌ Missing element with id 'counter'." };
      if (!btn) return { passed: false, message: "❌ Missing button with id 'increment-btn'." };
      if (counter.textContent?.trim() !== "0") return { passed: false, message: "❌ Initial counter value must be \"0\"." };
      
      // Simulate click
      (btn as any).click();
      if (counter.textContent?.trim() !== "1") {
        return { passed: false, message: "❌ Counter did not increment to \"1\" after one click. Current value: " + counter.textContent };
      }
      (btn as any).click();
      if (counter.textContent?.trim() !== "2") {
        return { passed: false, message: "❌ Counter did not increment to \"2\" after two clicks." };
      }
      return { passed: true, message: "✅ Success! Event listeners updating DOM values correctly." };
    },
    challengeDescription: `### Challenge: Amazon Shipping Calculator
Build an interactive shipping calculator.
HTML contains:
- An input element with **\`id=\"cost-input\"\`** where users type order cost.
- A button with **\`id=\"calc-btn\"\`** with text **\"Calculate\"**.
- A paragraph with **\`id=\"result-msg\"\`** to display results.
Write JS that listens to clicks on \`#calc-btn\`:
- Reads the cost from \`#cost-input\` (convert to number!).
- If cost is under **\`40\`** and greater than **\`0\`**, add shipping cost **\`10\`** and print the total in \`#result-msg\` (e.g. \`\"PHP45\"\`).
- If cost is **\`40\`** or higher, print the cost directly without shipping.
- If cost is empty or less than/equal to **\`0\`**, print **\`\"Error: order is empty\"\`** inside \`#result-msg\`.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const input = doc.querySelector('#cost-input') as HTMLInputElement;
      const btn = doc.querySelector('#calc-btn') as HTMLButtonElement;
      const msg = doc.querySelector('#result-msg');
      if (!input) return { passed: false, message: "❌ Missing input with id 'cost-input'." };
      if (!btn) return { passed: false, message: "❌ Missing button with id 'calc-btn'." };
      if (!msg) return { passed: false, message: "❌ Missing paragraph with id 'result-msg'." };

      // Case 1: Under 40
      input.value = "30";
      btn.click();
      if (!msg.textContent?.includes("40")) {
        return { passed: false, message: "❌ For cost of 30, expected result to be 40 (30 + 10 shipping). Got: " + msg.textContent };
      }

      // Case 2: Over 40
      input.value = "50";
      btn.click();
      if (!msg.textContent?.includes("50")) {
        return { passed: false, message: "❌ For cost of 50, expected result to be 50 (free shipping). Got: " + msg.textContent };
      }

      // Case 3: Empty / <= 0
      input.value = "";
      btn.click();
      if (!msg.textContent?.toLowerCase().includes("error")) {
        return { passed: false, message: "❌ For empty input, expected result to contain 'Error'. Got: " + msg.textContent };
      }
      return { passed: true, message: "✅ Challenge complete! Amazon Shipping Calculator functions correctly." };
    }
  },
  {
    id: 18,
    title: "Array Methods (Map, Filter, Callbacks)",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Iterate arrays and manipulate datasets using callback map and filter loops.",
    tutorial: `### Array Callbacks
Modern JavaScript avoids manual \`for\` loops for transforming datasets. Instead, we pass functions (callbacks) into array utility methods.

#### Callback Functions
A callback is a function passed into another function as an argument.

#### Array Map (\`.map()\`)
Creates a new array by transforming every item of the original array:
\`\`\`javascript
const nums = [1, 2, 3];
const doubles = nums.map(x => x * 2); // [2, 4, 6]
\`\`\`

#### Array Filter (\`.filter()\`)
Creates a new array containing only items that match a test condition:
\`\`\`javascript
const list = [1, 5, 8, 12];
const bigNums = list.filter(x => x > 6); // [8, 12]
\`\`\``,
    exampleCode: `const users = [
    { name: "Larenz", active: true },
    { name: "Paul", active: false }
];

// Transform: extract names
const names = users.map(u => u.name);
console.log("Names:", names);

// Filter: select active
const activeUsers = users.filter(u => u.active);
console.log("Active Users count:", activeUsers.length);`,
    activityDescription: `### Activity: Array Double Mapper
Apply map conversions to modify collections.

#### Objectives:
1. Write a function named **\`doubleNumbers\`** that takes an array parameter **\`arr\`**.
2. Inside the function, use **\`.map()\`** to multiply every item in the array by **\`2\`**.
3. **Return** the new transformed array.`,
    activityStarter: `// Write your doubleNumbers function below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const doubleNumbers = iframe.contentWindow.doubleNumbers;
      if (typeof doubleNumbers !== 'function') {
        return { passed: false, message: "❌ Missing function 'doubleNumbers'." };
      }
      const res = doubleNumbers([10, 20, 30]);
      if (!Array.isArray(res) || res[0] !== 20 || res[1] !== 40 || res[2] !== 60) {
        return { passed: false, message: "❌ Expected [10, 20, 30] to map to [20, 40, 60]. Got: " + JSON.stringify(res) };
      }
      return { passed: true, message: "✅ Success! Array map logic works." };
    },
    challengeDescription: `### Challenge: Online User Filter
Write a function **\`getOnlineUsers(users)\`** that:
- Accepts an array of user objects (each having properties \`name\` and \`status\`).
- Uses **\`.filter()\`** to select users whose \`status\` is exactly **\`\"online\"\`**.
- Returns the filtered array of user objects.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const getOnlineUsers = iframe.contentWindow.getOnlineUsers;
      if (typeof getOnlineUsers !== 'function') return { passed: false, message: "❌ Missing getOnlineUsers function." };
      const users = [
        { name: "A", status: "online" },
        { name: "B", status: "offline" },
        { name: "C", status: "online" }
      ];
      const online = getOnlineUsers(users);
      if (!Array.isArray(online) || online.length !== 2 || online[0].name !== "A" || online[1].name !== "C") {
        return { passed: false, message: "❌ Filter return is incorrect: " + JSON.stringify(online) };
      }
      return { passed: true, message: "✅ Challenge complete! Filters execute successfully." };
    }
  },
  {
    id: 19,
    title: "Error Handling & Try-Catch",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Intercept script failures and manage logic exceptions using try-catch blocks and throw checks.",
    tutorial: `### Try-Catch & Error Handling
Errors will happen in your applications (e.g. invalid user input, network failures). If an error is unhandled, your entire application crashes.

#### The Try-Catch Block
To prevent crashes, wrap risk-prone code inside a \`try\` block and handle the failure in a \`catch\` block:
\`\`\`javascript
try {
    const data = JSON.parse('invalid json'); // Throws an error
} catch (error) {
    console.log("Parsing failed:", error.message);
}
\`\`\`

#### Throwing Custom Errors
You can trigger custom errors using the \`throw\` keyword, which instantly passes control to the catch block:
\`\`\`javascript
function checkAge(age) {
    if (age < 0) {
        throw new Error("Age cannot be negative.");
    }
    return true;
}
\`\`\``,
    exampleCode: `function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return a / b;
    } catch(err) {
        console.warn("Caught error:", err.message);
        return null;
    }
}
console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // null`,
    activityDescription: `### Activity: Safe Division Handler
Build a division calculator that throws an error when attempting to divide by zero and catches it.

#### Objectives:
1. Write a function named **\`safeDivide\`** accepting two arguments: **\`a\`** (number) and **\`b\`** (number).
2. Inside, write a \`try\` block. If \`b\` is exactly **\`0\`**, throw a new Error with message **\`\"Cannot divide by zero.\"\`**. Otherwise return \`a / b\`.
3. Write a \`catch\` block that catches any thrown error and **returns** the error's message string (\`err.message\`).`,
    activityStarter: `// Write your safeDivide function below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const safeDivide = iframe.contentWindow.safeDivide;
      if (typeof safeDivide !== 'function') {
        return { passed: false, message: "❌ Missing function 'safeDivide'." };
      }
      if (safeDivide(10, 2) !== 5) return { passed: false, message: "❌ safeDivide(10, 2) must return 5." };
      const errRes = safeDivide(10, 0);
      if (errRes !== "Cannot divide by zero.") {
        return { passed: false, message: "❌ safeDivide(10, 0) must catch error and return 'Cannot divide by zero.'. Got: " + errRes };
      }
      return { passed: true, message: "✅ Success! Try-catch structures and custom error throws verified." };
    },
    challengeDescription: `### Challenge: JSON Object Validator
Write a function **\`validateConfig(jsonText)\`** that:
- Attempts to parse the \`jsonText\` using \`JSON.parse(jsonText)\`.
- If parsing succeeds, check if the parsed object has a property **\`\"port\"\`**.
- If it has a \`port\`, return the parsed object. If not, throw an Error **\`\"Missing port number.\"\`**.
- Wrap everything in try-catch: if any error is thrown (JSON parsing error OR missing port error), catch it and **return** the string message of the error.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const validateConfig = iframe.contentWindow.validateConfig;
      if (typeof validateConfig !== 'function') return { passed: false, message: "❌ Missing validateConfig function." };
      
      const success = validateConfig('{"port":8080}');
      if (typeof success !== 'object' || success.port !== 8080) {
        return { passed: false, message: "❌ Expected validateConfig to return parsed object on valid input." };
      }
      
      const parseFail = validateConfig('{"port":8080'); // invalid JSON
      if (typeof parseFail !== 'string') {
        return { passed: false, message: "❌ Expected invalid JSON string to be caught and return error message string." };
      }
      
      const missingPort = validateConfig('{"host":"localhost"}');
      if (missingPort !== "Missing port number.") {
        return { passed: false, message: "❌ Expected missing port to yield 'Missing port number.' got: " + missingPort };
      }
      return { passed: true, message: "✅ Challenge complete! Custom error validation pipeline operational." };
    }
  },

  // ==========================================
  // STAGE 4: ADVANCED JS & API MASTERY (Modules 20-25)
  // ==========================================
  {
    id: 20,
    title: "JSON — Structure, Parse, Stringify",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Convert JavaScript objects to and from JSON structured format strings.",
    tutorial: `### Understanding JSON (JavaScript Object Notation)
**JSON** is the universal language of data exchange on the web. Whenever your application sends data to a server or receives data from a database, it is almost always formatted as JSON.

#### Reading JSON: Syntax Rules & Data Types
JSON is built on two primary structures:
1.  **Objects:** A collection of key-value pairs wrapped in curly braces \`{}\`.
2.  **Arrays:** An ordered list of values wrapped in square brackets \`[]\`.

To read and write JSON correctly, you must follow strict syntax rules:
*   **Keys must be double-quoted:** Every property name (key) must be enclosed in double quotes (e.g., \`"name": "Larenz"\`). Single quotes or unquoted keys are invalid.
*   **Supported Data Types:** JSON values can only be one of the following:
    *   **String:** Must be double-quoted (e.g., \`"developer"\`).
    *   **Number:** Integer or floating point (e.g., \`25\` or \`3.14\`).
    *   **Boolean:** \`true\` or \`false\`.
    *   **Null:** Represents an empty value (\`null\`).
    *   **Object:** A nested key-value pair map.
    *   **Array:** A list of valid values.
*   **No Trailing Commas:** The last item inside an object or array must not end with a comma.
*   **No Functions or Comments:** JSON is strictly for **data storage**. You cannot include JavaScript functions, comments, or methods in a JSON file.

##### A Valid JSON Example:
\`\`\`json
{
  "name": "Larenz",
  "isStudent": false,
  "skills": ["HTML", "CSS", "JavaScript"],
  "stats": {
    "modulesCompleted": 19,
    "currentStage": "JS Fundamentals"
  },
  "notes": null
}
\`\`\`

#### Writing JSON in JavaScript
In JavaScript applications, you interact with JSON using two built-in methods on the global \`JSON\` object:

##### 1. Serializing (Writing JSON String)
When sending data to a server, you must convert your JavaScript object into a JSON string. This process is called **serialization** or **stringifying**.
*   **Basic stringify:** \`JSON.stringify(object)\` converts the object to a compact, single-line string.
*   **Pretty-print stringify:** \`JSON.stringify(object, null, 2)\` formats the JSON string with indentation (2 spaces) to make it readable in console logs or files.
\`\`\`javascript
const user = {
    name: "Larenz",
    role: "Dev",
    id: 25
};

const compactString = JSON.stringify(user);
console.log(compactString); 
// Output: {"name":"Larenz","role":"Dev","id":25}

const prettyString = JSON.stringify(user, null, 2);
console.log(prettyString);
/* Output:
{
  "name": "Larenz",
  "role": "Dev",
  "id": 25
}
*/
\`\`\`

##### 2. Deserializing (Reading JSON String)
When you receive a JSON string from a server or a local file, you must convert it into a JavaScript object so you can read and access its properties in your code. This is called **deserialization** or **parsing**.
\`\`\`javascript
const rawResponse = '{"status":"success","payload":{"port":8080}}';

const parsed = JSON.parse(rawResponse);
console.log(parsed.status);       // Output: "success"
console.log(parsed.payload.port); // Output: 8080
\`\`\`

##### 3. Catching JSON Parse Errors
If the string you are trying to parse is not valid JSON (for example, if it is missing a quote or ends with a trailing comma), \`JSON.parse()\` will throw a syntax error and crash your application. To prevent this, you should always wrap your parsing logic in a \`try...catch\` block:
\`\`\`javascript
const faultyJson = '{"name": "Mark",}'; // Invalid due to trailing comma

try {
    const data = JSON.parse(faultyJson);
    console.log(data.name);
} catch (error) {
    console.warn("Could not read JSON: ", error.message);
    // Handles error gracefully instead of crashing
}
\`\`\`

### Why this matters
Understanding JSON's strict requirements allows you to format configuration payloads and parse API response values correctly. Simple syntax bugs—like using single quotes or adding a trailing comma—are among the most common reasons API integrations fail.`,    exampleCode: `const client = {
    name: "Mark",
    active: true,
    hobbies: ["gaming", "coding"]
};

// Serialize
const text = JSON.stringify(client);
console.log("As JSON String:", text);

// Deserialize
const parsed = JSON.parse(text);
console.log("As Object Name:", parsed.name);`,
    activityDescription: `### Activity: JSON Conversion Engine
Write code to convert JS memory data to text and vice versa.

#### Objectives:
1. You are given a global object \`userData\`. Stringify \`userData\` and store the output string in a new variable named **\`jsonString\`**.
2. You are given a global JSON string \`apiResponse\`. Parse \`apiResponse\` back into a JS object and store the output object in a new variable named **\`parsedData\`**.`,
    activityStarter: `// Input variables provided automatically:
// const userData = { name: "Larenz", role: "Dev", id: 25 };
// const apiResponse = '{"status":"success","payload":{"port":8080}}';

// Write your conversions below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      iframe.contentWindow.userData = { name: "Larenz", role: "Dev", id: 25 };
      iframe.contentWindow.apiResponse = '{"status":"success","payload":{"port":8080}}';
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script Error: " + err.message };
      }
      const jsonString = iframe.contentWindow.jsonString;
      const parsedData = iframe.contentWindow.parsedData;
      if (jsonString === undefined) {
        return { passed: false, message: "❌ Missing variable 'jsonString'." };
      }
      if (typeof jsonString !== 'string') {
        return { passed: false, message: "❌ Variable 'jsonString' must be a string." };
      }
      if (!jsonString.includes('"name"') || !jsonString.includes('Larenz')) {
        return { passed: false, message: "❌ 'jsonString' does not appear to contain serialized 'userData'." };
      }
      if (parsedData === undefined) {
        return { passed: false, message: "❌ Missing variable 'parsedData'." };
      }
      if (typeof parsedData !== 'object' || parsedData === null) {
        return { passed: false, message: "❌ Variable 'parsedData' must be a JavaScript Object." };
      }
      if (!parsedData.payload || parsedData.payload.port !== 8080) {
        return { passed: false, message: "❌ 'parsedData' content does not match values from 'apiResponse'." };
      }
      return { passed: true, message: "✅ Success! JSON stringify and parse systems operate cleanly." };
    },
    challengeDescription: `### Challenge: Safe Parse Catch
Write code to parse incoming data safely.
Implement a function \`safeParse(jsonText)\` that tries to parse the text.
- If successful, return the parsed object.
- If the text is invalid JSON, catch the error and return the string **\`\"Invalid format\"\`**.`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const safeParse = iframe.contentWindow.safeParse;
      if (typeof safeParse !== 'function') {
        return { passed: false, message: "❌ Missing function 'safeParse(jsonText)'." };
      }
      const valid = safeParse('{"ok":true}');
      const invalid = safeParse('{"ok":true');
      if (typeof valid !== 'object' || valid.ok !== true) {
        return { passed: false, message: "❌ safeParse did not parse valid JSON correctly." };
      }
      if (invalid !== "Invalid format") {
        return { passed: false, message: "❌ safeParse did not catch parsing errors correctly. Expected \"Invalid format\", got: " + invalid };
      }
      return { passed: true, message: "✅ Challenge complete! Error boundary for parsing validated successfully." };
    }
  },
  {
    id: 21,
    title: "HTTP Fundamentals — Methods, Status Codes, Headers",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Understand the structure of HTTP requests: methods, headers, and status codes.",
    tutorial: `### HTTP (Hypertext Transfer Protocol)
**HTTP (Hypertext Transfer Protocol)** is an application-layer protocol that serves as the foundation for any data exchange on the World Wide Web. Originally designed to transmit hypermedia documents like HTML between web browsers and web servers, its role has expanded significantly to power machine-to-machine communication, programmatic access to APIs, and the dynamic fetching of page elements.

#### The Basics of HTTP
*   **The Client-Server Model:** HTTP operates on a classic client-server model. Communication is always initiated by a client (often called a user-agent, such as a web browser), which sends an HTTP **request** to a server. The server handles this request and replies with an HTTP **response** containing the requested data or a status code indicating what happened.
*   **Message-Based Communication:** Instead of maintaining a continuous stream of data, clients and servers converse by exchanging individual, structured messages. Older versions (HTTP/1.1) use human-readable text messages, while modern versions (HTTP/2) encapsulate these messages into highly efficient binary frames.
*   **Underlying Connections:** Because HTTP sits at the application layer, it relies on underlying transport protocols—typically a reliable TCP (Transmission Control Protocol) connection—to actually move the data across the network. A client and server must establish this TCP connection before any HTTP messages can be sent.
*   **Statelessness:** By default, HTTP is a **stateless protocol**, meaning the server does not retain any memory or session data between consecutive requests. Every resource fetch is treated as a completely new, independent interaction. 

#### The Importance of HTTP
*   **The Backbone of Browsing:** HTTP is the language that allows browsers to fetch an initial HTML document and then automatically send follow-up requests to gather all the required sub-resources (like CSS layout files, JavaScript files, images, and videos) to assemble and display a complete webpage.
*   **Limitless Extensibility:** The true power of HTTP lies in its extensibility, which is driven by **HTTP headers**. These metadata fields allow developers to constantly evolve the protocol without changing its core structure. Most notably, headers were used to bypass the protocol's inherent statelessness by introducing **HTTP cookies**, enabling stateful user sessions so you can stay logged in to a website or keep items in a digital shopping cart. 
*   **Controls Critical Web Infrastructure:** Beyond simply fetching documents, HTTP provides the mechanisms to control essential web operations. It governs how resources are **cached** to dramatically improve performance and save bandwidth, enforces **authentication** protocols to protect private resources, manages security policies like relaxing origin constraints, and dictates how messages pass through intermediary **proxies** and firewalls.
*   **Powers Modern Web Applications and APIs:** HTTP is fundamental to modern web development. Applications heavily rely on HTTP-based tools like the JavaScript Fetch API to make dynamic requests in the background, and use Server-Sent Events to allow servers to stream live updates to users. Furthermore, architectural styles like REST APIs rely entirely on standard HTTP status codes (such as **200 OK**, **404 Not Found**, or **500 Internal Server Error**) to reliably communicate the success or failure of complex programmatic operations.

### Why this matters
Understanding the request-response model, connection layer, message structure, and headers is critical for writing backend code or using fetch APIs to download dynamic resources on the frontend.`,
    exampleCode: `// Example options configuration for creating a post via HTTP POST
const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: "API Fundamentals",
        body: "HTTP is stateless."
    })
};
console.log("Method:", requestOptions.method);
console.log("Content-Type Header:", requestOptions.headers["Content-Type"]);`,
    activityDescription: `### Activity: Building Request Packages
Design an options configuration object matching specification inputs for a server edit.

#### Objectives:
Create a globally accessible variable object named **\`httpConfig\`** with properties:
1. **\`method\`** set to the string **\`\"POST\"\`**.
2. **\`headers\`** set to an object containing:
   - **\`\"Content-Type\"\`** set to **\`\"application/json\"\`**.
3. **\`body\`** containing a JSON formatted string wrapping:
   - **\`{ \"title\": \"Forge Rules\" }\`**.`,
    activityStarter: `// Define httpConfig below:
`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script Error: " + err.message };
      }
      const config = iframe.contentWindow.httpConfig;
      if (config === undefined) {
        return { passed: false, message: "❌ Missing variable object 'httpConfig'." };
      }
      if (config.method !== "POST") {
        return { passed: false, message: "❌ Method property must be exactly \"POST\"." };
      }
      if (!config.headers || config.headers["Content-Type"] !== "application/json") {
        return { passed: false, message: "❌ Headers must include \"Content-Type\": \"application/json\"." };
      }
      if (typeof config.body !== "string") {
        return { passed: false, message: "❌ Body property must be a string (JSON representation)." };
      }
      try {
        const bodyObj = JSON.parse(config.body);
        if (bodyObj.title !== "Forge Rules") {
          return { passed: false, message: "❌ JSON payload title must be exactly \"Forge Rules\"." };
        }
      } catch (err: any) {
        return { passed: false, message: "❌ Body does not contain valid JSON content." };
      }
      return { passed: true, message: "✅ Success! The HTTP request payload is correctly configured." };
    },
    challengeDescription: `### Challenge: Profile Update Options
Construct a configuration object named \`updateConfig\` for a \`PUT\` request.
Properties required:
- \`method\` set to \`\"PUT\"\`
- \`headers\` containing \`\"Content-Type\"\` set to \`\"application/json\"\` and \`\"Authorization\"\` set to \`\"Bearer my-secret-key\"\`
- \`body\` with stringified JSON: \`{ \"name\": \"Larenz\" }\``,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Code syntax error: " + e.message };
      }
      const updateConfig = iframe.contentWindow.updateConfig;
      if (!updateConfig) return { passed: false, message: "❌ Missing variable 'updateConfig'." };
      if (updateConfig.method !== "PUT") return { passed: false, message: "❌ Method must be PUT." };
      if (!updateConfig.headers || updateConfig.headers["Content-Type"] !== "application/json") {
        return { passed: false, message: "❌ Headers must include 'Content-Type'." };
      }
      if (updateConfig.headers["Authorization"] !== "Bearer my-secret-key") {
        return { passed: false, message: "❌ Headers must include 'Authorization' with Bearer token." };
      }
      try {
        const body = JSON.parse(updateConfig.body);
        if (body.name !== "Larenz") return { passed: false, message: "❌ Body content incorrect." };
      } catch(e: any) {
        return { passed: false, message: "❌ Body must be valid stringified JSON." };
      }
      return { passed: true, message: "✅ Challenge complete! PUT config is properly formulated." };
    }
  },
  {
    id: 22,
    title: "Fetch API — Making Requests, Promises, async/await",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Retrieve network resources using JavaScript fetch, Promises, and async/await.",
    tutorial: `### Fetching Remote Resources
To build interactive web applications, you need to request data from external servers. The built-in **\`fetch()\`** API is the standard tool in JavaScript for making network requests.

#### Handling Asynchronous Data: Two Approaches
Since network requests take time, \`fetch()\` returns a **Promise** (a container for future data). You can resolve this Promise in two ways:

##### 1. The Promise Chaining Method (\`.then()\`)
In older or traditional JavaScript code, we handle Promises using \`.then()\` callbacks. Each \`.then()\` processes the resolved value and returns another Promise:
\`\`\`javascript
// Fetching a Pokemon from PokeAPI using .then()
fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then(response => {
        if (!response.ok) throw new Error("HTTP error: " + response.status);
        return response.json(); // Parses JSON response body
    })
    .then(pokemon => {
        console.log("Pokemon name:", pokemon.name);
    })
    .catch(error => {
        console.error("Failed to fetch Pokemon:", error.message);
    });
\`\`\`

##### 2. The Modern Asynchronous Method (\`async/await\`)
\`async/await\` is a cleaner, more readable syntax built on top of Promises. It allows you to write asynchronous code that looks and behaves like synchronous code:
\`\`\`javascript
// Fetching a random user profile using async/await
async function getRandomUser() {
    try {
        const response = await fetch("https://randomuser.me/api/");
        if (!response.ok) throw new Error("Status: " + response.status);
        const data = await response.json();
        const user = data.results[0];
        console.log("Random User:", user.name.first, user.name.last);
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }
}
getRandomUser();
\`\`\`

#### HTTP Methods in Fetch
By default, \`fetch()\` makes a **GET** request. To perform other operations (like creating, updating, or deleting data), you must supply a configuration object as the second argument:

##### GET (Read Data)
\`\`\`javascript
// GET a list of comments from JSONPlaceholder
async function getComments() {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1");
    const comments = await response.json();
    console.log("First comment body:", comments[0].body);
}
\`\`\`

##### POST (Create Data)
\`\`\`javascript
// POST a new post to JSONPlaceholder
async function publishPost() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Exploring Web Dev",
            body: "Learning fetch APIs is vital.",
            userId: 1
        })
    });
    const newPost = await response.json();
    console.log("Created Post ID:", newPost.id); // Returns 101 (mock ID)
}
\`\`\`

##### PUT (Update Data)
\`\`\`javascript
// PUT (overwrite) an existing post
async function updatePost() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 1,
            title: "Updated Post Title",
            body: "Replaced content",
            userId: 1
        })
    });
    const updatedPost = await response.json();
    console.log("Updated Post title:", updatedPost.title);
}
\`\`\`

##### DELETE (Delete Data)
\`\`\`javascript
// DELETE a post on the server
async function removePost() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE"
    });
    if (response.ok) {
        console.log("Post 1 deleted successfully!");
    }
}
\`\`\`

### Why this matters
Almost every single modern web app talks to APIs. Whether you are loading user profiles, updating a shipping address, or hitting public APIs like PokeAPI, knowing how to structure fetch calls using GET, POST, PUT, and DELETE with both \`.then()\` and \`async/await\` is a core requirement of web engineering.`,    exampleCode: `async function getFirstUser() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const user = await res.json();
        console.log("User Loaded:", user.name);
    } catch(err) {
        console.error("Fetch error:", err.message);
    }
}
getFirstUser();`,
    activityDescription: `### Activity: User List Downloader
Write an asynchronous function to fetch and download user directories.

#### Objectives:
1. Declare an \`async\` function named **\`getUsers\`**.
2. Inside \`getUsers\`, fetch data from the URL: **\`\"https://jsonplaceholder.typicode.com/users\"\`**.
3. Convert the response body text to a JavaScript object/array using **\`.json()\`**.
4. **Return** the resolved array of users.`,
    activityStarter: `// Write your getUsers function below:
`,
    activityValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script syntax error: " + err.message };
      }
      const getUsers = iframe.contentWindow.getUsers;
      if (typeof getUsers !== 'function') {
        return { passed: false, message: "❌ Missing function 'getUsers'." };
      }
      try {
        const promise = getUsers();
        if (!(promise instanceof Promise)) {
          return { passed: false, message: "❌ 'getUsers' must return a Promise (be declared as 'async')." };
        }
        const data = await promise;
        if (!Array.isArray(data)) {
          return { passed: false, message: "❌ 'getUsers' return value must resolve to an Array." };
        }
        if (data.length === 0 || !data[0].name) {
          return { passed: false, message: "❌ Return content does not look like user profiles list." };
        }
      } catch (err: any) {
        return { passed: false, message: "❌ Execution Error: " + err.message };
      }
      return { passed: true, message: "✅ Success! Async fetch function successfully downloads and parses remote JSON data." };
    },
    challengeDescription: `### Challenge: Fetch Error Handlers
Implement \`getUserName(id)\` that:
- Fetches \`https://jsonplaceholder.typicode.com/users/\` + \`id\`.
- If successful, return the user's \`name\` string.
- If the fetch fails (e.g. status code 404), return the string **\`\"User not found\"\`**.`,
    challengeValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Syntax error: " + e.message };
      }
      const getUserName = iframe.contentWindow.getUserName;
      if (typeof getUserName !== 'function') return { passed: false, message: "❌ Missing getUserName function." };
      try {
        const nameVal = await getUserName(1);
        if (typeof nameVal !== 'string' || nameVal.trim() === '') {
          return { passed: false, message: "❌ Expected string name on valid request, got: " + nameVal };
        }
        const errorVal = await getUserName(99);
        if (errorVal !== "User not found") {
          return { passed: false, message: "❌ Expected error path to return \"User not found\". Got: " + errorVal };
        }
      } catch(e: any) {
        return { passed: false, message: "❌ The function threw an unhandled error: " + e.message };
      }
      return { passed: true, message: "✅ Challenge complete! Error handling routes function properly." };
    }
  },
  {
    id: 23,
    title: "REST API Concepts — Endpoints, Resources, RESTful Design",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Design endpoints and integrate client actions with RESTful systems.",
    tutorial: `### The Core Concept of an API
An API (Application Programming Interface) allows different software systems to communicate and share data.

#### The Restaurant Metaphor
You can think of an API as a waiter in a restaurant. The customer (your application) gives an order (the request) to the waiter (the API). The waiter takes this to the kitchen (the server), which prepares the food. The waiter then brings the food (the response) back to the customer. The customer gets exactly what they need without having to go into the kitchen or know how the food was cooked.

#### Why we use them
Developers use APIs to add complex functionality to their apps—like Google Translate, payment processing, or location services—without having to build those systems from scratch.

### Understanding REST Architecture
REST (Representational State Transfer) is the most widely used standard for building web APIs. Key lessons on designing a well-behaved RESTful API include:

*   **Resource-Based URIs:** REST organizes data into "resources." The endpoints (URLs) used to access these resources should be grouped by nouns, not verbs (e.g., using \`/products\` rather than \`/getproducts\`).
*   **Statelessness:** Every request and response is completely independent. The server does not need to store any context or session information about previous requests from the client.
*   **Best Practices:** For endpoints that return massive amounts of data, APIs should use pagination (like \`limit\` and \`offset\` parameters) to manage the payload. APIs should also use versioning (e.g., \`/v1/\` or \`/v2/\` in the URL) to ensure backward compatibility when changes are made.

### HTTP Methods and CRUD Operations
REST APIs use standard HTTP verbs to perform CRUD (Create, Read, Update, Delete) operations on resources:
*   **GET:** Retrieves data from the server. It does not modify anything.
*   **POST:** Creates a new resource on the server.
*   **PUT:** Updates an existing resource by completely replacing it.
*   **DELETE:** Removes a resource from the server.

#### Idempotency
A key concept where making multiple identical requests has the same exact effect as making just one. While GET, PUT, and DELETE are generally idempotent, POST requests usually are not (sending it twice might create two duplicate items).

### Anatomy of API Requests and Responses
To successfully communicate with a server, you must structure your requests correctly:
*   **The URL Structure:** A typical request includes a Base URI (the server address) followed by a specific Path (the resource).
*   **Parameters:** You can modify your request using Path Variables (identifying a specific item, like customer ID "4") or Query Parameters (added after a \`?\` in the URL to filter or sort data, like \`?beer_type=light\`).
*   **Headers and Authorization:** APIs often require an authentication token in the request headers to verify your identity, similar to a secure password. Headers also dictate metadata, like what language or data format is expected.
*   **The Body Payload:** When creating or updating data (POST/PUT), you send the actual data in the request body, typically formatted in JSON.
*   **Status Codes:** The server's response will include an HTTP status code indicating the result: 200-level codes mean success (e.g., 200 OK, or 201 for a successful creation), 400-level codes mean the client made an error (like bad syntax), and 500-level codes mean the server itself crashed or failed.

### Why this matters
Designing and consuming RESTful endpoints properly makes integration straightforward. Ensuring URIs are resource-based, payload structures are correct, and status codes match outcomes prevents communication failures.`,    exampleCode: `async function createResource(newObj) {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: { "Content-Type": "application/json" }
    });
    return await res.json();
}
createResource({ title: "JSON Tutorial" }).then(res => console.log("Created ID:", res.id));`,
    activityDescription: `### Activity: Post Publisher
Create a script to publish articles to a REST endpoint.

#### Objectives:
Write an async function named **\`createPost\`** that:
1. Takes a single parameter **\`postData\`** (an object containing title, body, etc).
2. Makes a **\`POST\`** request to **\`\"https://jsonplaceholder.typicode.com/posts\"\`**.
3. Pass the **\`postData\`** inside the request body stringified, and add headers:
   - \`\"Content-Type\": \"application/json\"\`
4. **Return** the resolved response object parsed using \`.json()\`.`,
    activityStarter: `// Write your createPost function below:
`,
    activityValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const createPost = iframe.contentWindow.createPost;
      if (typeof createPost !== 'function') {
        return { passed: false, message: "❌ Missing function 'createPost'." };
      }
      try {
        const dummy = { title: "Test", body: "Content", userId: 1 };
        const promise = createPost(dummy);
        if (!(promise instanceof Promise)) {
          return { passed: false, message: "❌ 'createPost' must return a Promise." };
        }
        const response = await promise;
        if (!response || !response.id) {
          return { passed: false, message: "❌ Server did not return a valid object containing an 'id'." };
        }
        const calls = iframe.contentWindow.fetchCalls;
        const lastCall = calls[calls.length - 1];
        if (!lastCall) {
          return { passed: false, message: "❌ No fetch call detected." };
        }
        if (lastCall.method !== 'POST') {
          return { passed: false, message: "❌ The HTTP request method must be exactly 'POST'." };
        }
        if (!lastCall.url.includes('/posts')) {
          return { passed: false, message: "❌ Endpoint path must target '/posts'." };
        }
        if (lastCall.headers["Content-Type"] !== "application/json") {
          return { passed: false, message: "❌ Missing request header 'Content-Type: application/json'." };
        }
      } catch (err: any) {
        return { passed: false, message: "❌ Runtime execution failed: " + err.message };
      }
      return { passed: true, message: "✅ Success! The REST POST handler works perfectly." };
    },
    challengeDescription: `### Challenge: Delete Resource
Implement an async function \`deletePost(postId)\` that:
- Sends a **\`DELETE\`** request to \`https://jsonplaceholder.typicode.com/posts/\` + \`postId\`.
- If the HTTP response status is 200, return \`true\`. Else, return \`false\`.`,
    challengeValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Syntax error: " + e.message };
      }
      const deletePost = iframe.contentWindow.deletePost;
      if (typeof deletePost !== 'function') return { passed: false, message: "❌ Missing deletePost function." };
      try {
        const success = await deletePost(1);
        if (success !== true) return { passed: false, message: "❌ Expected deletePost to return true on status 200." };
        const calls = iframe.contentWindow.fetchCalls;
        const lastCall = calls[calls.length - 1];
        if (!lastCall || lastCall.method !== 'DELETE') {
          return { passed: false, message: "❌ No fetch call with method DELETE detected." };
        }
      } catch(e: any) {
        return { passed: false, message: "❌ Error during execution: " + e.message };
      }
      return { passed: true, message: "✅ Challenge complete! DELETE resource handler successfully configured." };
    }
  },
  {
    id: 24,
    title: "Authentication — API Keys, Bearer Tokens, Basic Auth",
    stage: "javascript",
    difficulty: "advanced",
    description: "Authorize your requests using API keys, Basic credentials, and Bearer Tokens.",
    tutorial: `### API Authentication
Most APIs are private and require clients to verify their identity.

#### Common Auth Methods
1. **API Keys**: A unique secret string passed as a query parameter or custom header (e.g. \`x-api-key: secret\`).
2. **Bearer Tokens (JWT)**: Used in modern web apps. After logging in, you receive a token that you send in the headers of all future requests:
   \`\`\`
   Authorization: Bearer <your_jwt_token_here>
   \`\`\``,
    exampleCode: `async function loadPrivateDocs() {
    const token = "secureJWTValue123";
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        headers: {
            "Authorization": "Bearer " + token
        }
      });
      const data = await res.json();
      console.log("Title loaded securely:", data.title);
}
loadPrivateDocs();`,
    activityDescription: `### Activity: Authorized Downloader
Write a fetch command that adds authorization header credentials to access private server nodes.

#### Objectives:
Write an async function named **\`fetchSecureData\`** that:
1. Takes two parameters: **\`url\`** (string) and **\`apiKey\`** (string).
2. Makes a GET request to the target URL.
3. Attaches a custom header named **\`\"x-api-key\"\`** set to the value of the \`apiKey\` parameter.
4. **Returns** the parsed JSON response object.`,
    activityStarter: `// Write your fetchSecureData function below:
`,
    activityValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const fetchSecureData = iframe.contentWindow.fetchSecureData;
      if (typeof fetchSecureData !== 'function') {
        return { passed: false, message: "❌ Missing function 'fetchSecureData'." };
      }
      try {
        const testUrl = "https://jsonplaceholder.typicode.com/posts/1";
        const key = "forge-core-key-99";
        const promise = fetchSecureData(testUrl, key);
        if (!(promise instanceof Promise)) {
          return { passed: false, message: "❌ 'fetchSecureData' must return a Promise." };
        }
        const data = await promise;
        if (!data || !data.title) {
          return { passed: false, message: "❌ The fetch secure function failed to load valid data." };
        }
        const calls = iframe.contentWindow.fetchCalls;
        const lastCall = calls[calls.length - 1];
        if (!lastCall) {
          return { passed: false, message: "❌ Fetch request did not register." };
        }
        if (lastCall.headers["x-api-key"] !== "forge-core-key-99") {
          return { passed: false, message: "❌ Missing header 'x-api-key' with matching key value." };
        }
      } catch (err: any) {
        return { passed: false, message: "❌ Execution failure: " + err.message };
      }
      return { passed: true, message: "✅ Success! API authentication key headers injected successfully." };
    },
    challengeDescription: `### Challenge: Authorization Bearer Injector
Create a function \`fetchWithToken(url, token)\` that:
- Executes a GET request to \`url\`.
- Injects an \`Authorization\` header containing \`\"Bearer \" + token\`.
- Returns the parsed JSON response.`,
    challengeValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Syntax error: " + e.message };
      }
      const fetchWithToken = iframe.contentWindow.fetchWithToken;
      if (typeof fetchWithToken !== 'function') return { passed: false, message: "❌ Missing fetchWithToken function." };
      try {
        const res = await fetchWithToken("https://jsonplaceholder.typicode.com/posts/1", "my-tkn-88");
        const calls = iframe.contentWindow.fetchCalls;
        const lastCall = calls[calls.length - 1];
        if (!lastCall || lastCall.headers["Authorization"] !== "Bearer my-tkn-88") {
          return { passed: false, message: "❌ Authorization header must be set to 'Bearer my-tkn-88'." };
        }
      } catch(e: any) {
        return { passed: false, message: "❌ Runtime error: " + e.message };
      }
      return { passed: true, message: "✅ Challenge complete! Bearer Token header authentication is fully implemented." };
    }
  },
  {
    id: 25,
    title: "Real-World API Project — Chaining Requests",
    stage: "javascript",
    difficulty: "advanced",
    description: "Chain sequential API calls to build an integrated CRUD operation workflow.",
    tutorial: `### Chaining Asynchronous Requests
Real-world applications often need to make multiple API requests where subsequent calls depend on the results of previous calls. For example, you might create a new resource, obtain its generated ID, use that ID to fetch related settings, and finally update the resource.

Using \`async/await\` makes request chaining clean, serial, and highly readable:
\`\`\`javascript
async function runCrudFlow() {
    // 1. Create a user
    const user = await createUser();
    // 2. Use user ID to post content
    const post = await createPostForUser(user.id);
    // 3. Delete the post using post ID
    await deletePost(post.id);
}
\`\`\`

### Practical API Testing Using Postman
**Postman** is a widely used API client application that allows developers and Quality Assurance (QA) engineers to send API requests and test responses without writing complex application code.

*   **Organization:** In Postman, you can group your API requests into **Collections** (folders) to keep your tests organized. This allows teams to share, version-control, and document their API integration tests in a unified workspace.
*   **Execution and Visualization:** You can manually paste a URL endpoint, select the HTTP method (GET, POST, PUT, DELETE), add your JSON payload or authentication headers, and hit "Send." Postman easily formats the server's JSON response in a highly readable, syntax-highlighted **"Pretty" view** alongside status codes and response headers.
*   **Test Automation:** Postman allows you to write basic automated test scripts using JavaScript snippets inside the **"Tests" tab**. For example, you can write a test that automatically verifies if the server responds with a 200 status code:
\`\`\`javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
\`\`\`
You can then run your entire Collection to see which tests pass and which ones fail.

### Why this matters
Testing APIs with client tools like Postman before coding ensures backend endpoints conform to expectations. Once verified, chaining those API calls cleanly in code ensures your application manages user data workflows reliably.`,    exampleCode: `async function testChain() {
    console.log("Starting chain...");
    const post = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => r.json());
    console.log("Step 1 (Loaded Title):", post.title);
    
    const update = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Updated Title" })
    }).then(r => r.json());
    console.log("Step 2 (Updated Title):", update.title);
}
testChain();`,
    activityDescription: `### Activity: CRUD Flow Integration
Chain multiple fetch requests to run a full CRUD lifecycle simulation against a live backend.

#### Objectives:
Write an async function named **\`runCrudFlow\`** that executes the following chain:
1. Make a GET request to **\`\"https://jsonplaceholder.typicode.com/posts/1\"\`** to read an existing post.
2. Make a POST request to **\`\"https://jsonplaceholder.typicode.com/posts\"\`** with a JSON body representing a new article:
   - \`{ title: \"DevPulse Chain\", body: \"Sequential calls worked!\", userId: 1 }\`
3. Make a PUT request to update the title of the post created in step 2 (URL: **\`\"https://jsonplaceholder.typicode.com/posts/1\"\`**) changing the title to **\`\"DevPulse Title Updated\"\`**.
4. Make a DELETE request to **\`\"https://jsonplaceholder.typicode.com/posts/1\"\`**.
5. **Return** an array containing the parsed output responses from the first three requests (GET response, POST response, and PUT response).`,
    activityStarter: `// Write your runCrudFlow function below:
`,
    activityValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch (err: any) {
        return { passed: false, message: "❌ Script error: " + err.message };
      }
      const runCrudFlow = iframe.contentWindow.runCrudFlow;
      if (typeof runCrudFlow !== 'function') {
        return { passed: false, message: "❌ Missing function 'runCrudFlow'." };
      }
      try {
        const promise = runCrudFlow();
        if (!(promise instanceof Promise)) {
          return { passed: false, message: "❌ 'runCrudFlow' must return a Promise." };
        }
        const results = await promise;
        if (!Array.isArray(results) || results.length !== 3) {
          return { passed: false, message: "❌ 'runCrudFlow' must return an array of 3 response elements." };
        }
        if (!results[0].title || !results[1].id || results[2].title !== "DevPulse Title Updated") {
          return { passed: false, message: "❌ Return values do not match expected outcomes." };
        }
        const calls = iframe.contentWindow.fetchCalls;
        const methods = calls.map((c: any) => c.method);
        if (!methods.includes('GET')) return { passed: false, message: "❌ Missing GET fetch request." };
        if (!methods.includes('POST')) return { passed: false, message: "❌ Missing POST fetch request." };
        if (!methods.includes('PUT')) return { passed: false, message: "❌ Missing PUT fetch request." };
        if (!methods.includes('DELETE')) return { passed: false, message: "❌ Missing DELETE fetch request." };
      } catch (err: any) {
        return { passed: false, message: "❌ Execution Error: " + err.message };
      }
      return { passed: true, message: "✅ Success! Chained CRUD flow successfully completed." };
    },
    challengeDescription: `### Challenge: User Comments Aggregate
Write an async function \`loadUserPostComments(userId)\` that:
1. Fetches \`https://jsonplaceholder.typicode.com/posts?userId=\` + \`userId\`.
2. Takes the first post from the returned list (index 0).
3. Fetches the comments of that post: \`https://jsonplaceholder.typicode.com/posts/\` + \`post.id\` + \`/comments\`.
4. Returns the list of comments (array).`,
    challengeValidation: async function(code, iframe, logs, fetchCalls) {
      try {
        iframe.contentWindow.eval(code);
      } catch(e: any) {
        return { passed: false, message: "❌ Syntax error: " + e.message };
      }
      const loadUserPostComments = iframe.contentWindow.loadUserPostComments;
      if (typeof loadUserPostComments !== 'function') return { passed: false, message: "❌ Missing loadUserPostComments function." };
      try {
        const comments = await loadUserPostComments(1);
        if (!Array.isArray(comments) || comments.length === 0 || !comments[0].email) {
          return { passed: false, message: "❌ Should return list of comments." };
        }
        const calls = iframe.contentWindow.fetchCalls;
        if (calls.length < 2) {
          return { passed: false, message: "❌ Function should execute at least 2 fetch requests." };
        }
      } catch(e: any) {
        return { passed: false, message: "❌ Execution error: " + e.message };
      }
      return { passed: true, message: "✅ Challenge complete! Sequential chained requests resolved successfully." };
    }
  },
  {
    id: 26,
    title: "Python Web APIs — Requests & FastAPI",
    stage: "javascript",
    difficulty: "intermediate",
    description: "Perform HTTP requests in Python and build high-performance APIs using FastAPI.",
    tutorial: `### Python API Development & Integration
Python is one of the most popular languages for building backends and automating API integrations. This module teaches you how to consume APIs in Python and build your own endpoints using the modern **FastAPI** framework.

#### Consuming APIs in Python: The \`requests\` Library
To make HTTP requests to other servers in Python, developers use the simple **\`requests\`** library. It supports all standard HTTP verbs:

##### 1. GET Requests (Read Data)
\`\`\`python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
if response.status_code == 200:
    data = response.json() # Parses JSON response body
    print("Post Title:", data["title"])
\`\`\`

##### 2. POST Requests (Create Data)
\`\`\`python
import requests

payload = {"title": "Python Basics", "body": "FastAPI is awesome."}
response = requests.post("https://jsonplaceholder.typicode.com/posts", json=payload)
print("Response JSON:", response.json()) # Prints mock post object with generated id
\`\`\`

---

#### Building APIs in Python: FastAPI
**FastAPI** is a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints.

##### Why use FastAPI?
*   **Speed:** Extremely fast; on par with NodeJS and Go.
*   **Auto-Documentation:** Generates interactive API documentation (Swagger UI at \`/docs\`) automatically.
*   **Type Safety:** Uses Pydantic models to validate incoming JSON request body structures before execution.
*   **Asynchronous:** Full support for \`async\` and \`await\`.

##### Creating a FastAPI Application
A FastAPI server is written by decorating python functions with route decorators specifying path and HTTP methods:
\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

# 1. Instantiate the app
app = FastAPI()

# 2. Define Pydantic request schema for body validation
class Item(BaseModel):
    name: str
    price: float

# 3. GET endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Python FastAPI"}

# 4. POST endpoint with JSON body Pydantic validation
@app.post("/items")
def create_item(item: Item):
    return {"message": "Success!", "received_item": item.dict()}
\`\`\`

##### Running FastAPI Locally
To run a FastAPI application, developers use **Uvicorn** (an ASGI web server):
\`\`\`bash
uvicorn main:app --reload
\`\`\`
*   \`main\` is the filename (\`main.py\`).
*   \`app\` is the variable holding the FastAPI instance.
*   \`--reload\` automatically restarts the server when code changes.

### Why this matters
Python is widely used in AI/ML, data analysis, and microservices. Combining the \`requests\` library for consuming third-party data with FastAPI for serving robust backend endpoints provides a complete foundation for python backend engineering.`,
    exampleCode: `from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

class Product(BaseModel):
    name: str
    stock: int

# GET route making internal request to public API
@app.get("/pokemon/{pokemon_name}")
def get_pokemon(pokemon_name: str):
    res = requests.get(f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}")
    if res.status_code == 200:
        return res.json()
    return {"error": "Pokemon not found"}

# POST route accepting validated request body
@app.post("/products")
def add_product(prod: Product):
    return {"status": "Added to inventory", "item": prod}
`,
    activityDescription: `### Activity: Python & FastAPI Starter
Create a basic FastAPI app and fetch an external API using Python.

#### Objectives:
Write a Python script that completes the following steps:
1. Define a FastAPI application and store it in a variable named **\`api\`**.
2. Implement a GET route decorator on the app variable **\`api\`** at path **\`\"/status\"\`** returning a dictionary **\`{\"status\": \"online\"}\`**.
3. Perform a GET request using the \`requests\` library to URL **\`\"https://jsonplaceholder.typicode.com/posts/1\"\`** and store the response in a variable named **\`res\`**.`,
    activityStarter: `from fastapi import FastAPI
import requests

# 1. Initialize your FastAPI app named 'api' below:


# 2. Create your GET /status route decorator and function below:


# 3. Fetch from the posts/1 endpoint and save to 'res' below:

`,
    activityValidation: function(code, iframe, logs, fetchCalls) {
      if (!code.includes("requests.get")) {
        return { passed: false, message: "❌ Missing the requests.get() library call." };
      }
      if (!/res\s*=\s*requests\.get/i.test(code)) {
        return { passed: false, message: "❌ The GET request response must be assigned to variable 'res'." };
      }
      if (!code.includes("https://jsonplaceholder.typicode.com/posts/1")) {
        return { passed: false, message: "❌ The request URL must target 'https://jsonplaceholder.typicode.com/posts/1'." };
      }
      if (!/api\s*=\s*FastAPI\(\)/.test(code)) {
        return { passed: false, message: "❌ Missing FastAPI application instantiation on variable name 'api'." };
      }
      if (!/@api\.get\(\s*["']\/status["']\s*\)/.test(code)) {
        return { passed: false, message: "❌ Missing GET route decorator on path '/status' for application instance 'api'." };
      }
      // Check function structure
      const lines = code.split('\n');
      const defLineIndex = lines.findIndex(l => l.includes("def ") && l.includes("status"));
      if (defLineIndex === -1) {
        return { passed: false, message: "❌ Missing route handler function definition." };
      }
      const returnLine = lines.slice(defLineIndex + 1).find(l => l.includes("return") && l.includes("status") && l.includes("online"));
      if (!returnLine) {
        return { passed: false, message: "❌ Route function must return a dictionary containing {\"status\": \"online\"}." };
      }
      return { passed: true, message: "✅ Success! Python request execution and FastAPI router mapped correctly." };
    },
    challengeDescription: `### Challenge: Pydantic Body Validations
Implement a FastAPI server route that accepts and validates structured JSON user input.

#### Specifications:
1. Create a FastAPI app named **\`app\`**.
2. Declare a Pydantic model class named **\`User\`** (inheriting from \`BaseModel\`) with two fields:
   - **\`username\`**: a string data type.
   - **\`role\`**: a string data type.
3. Define a POST route decorator at path **\`\"/users\"\`** that accepts a parameter of type **\`User\`** and returns a dictionary payload:
   - **\`{\"greeting\": f\"Hello {user.username}!\"}\`** (or matching equivalent format).`,
    challengeValidation: function(code, iframe, logs, fetchCalls) {
      if (!/class\s+User\s*\(\s*BaseModel\s*\)/.test(code)) {
        return { passed: false, message: "❌ Missing Pydantic model declaration 'class User(BaseModel)'." };
      }
      if (!/username\s*:\s*str/i.test(code)) {
        return { passed: false, message: "❌ The User model must declare string field 'username'." };
      }
      if (!/role\s*:\s*str/i.test(code)) {
        return { passed: false, message: "❌ The User model must declare string field 'role'." };
      }
      if (!/app\s*=\s*FastAPI\(\)/.test(code)) {
        return { passed: false, message: "❌ Missing FastAPI application instantiation on variable 'app'." };
      }
      if (!/@app\.post\(\s*["']\/users["']\s*\)/.test(code)) {
        return { passed: false, message: "❌ Missing POST route decorator at path '/users' on app instance." };
      }
      if (!/return\s*\{["']greeting["']\s*:\s*f?["']Hello\s+.*username.*["']\}/i.test(code)) {
        return { passed: false, message: "❌ Route return statement must return greeting structure: '{\"greeting\": f\"Hello {user.username}!\"}'." };
      }
      return { passed: true, message: "✅ Challenge complete! Pydantic data schemas and route validators created successfully in Python." };
    }
  }
];
