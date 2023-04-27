exports.build = function(title, pageTitle, content) {
    return [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<title>{title}</title>',
        '<link rel="stylesheet" href="/assets/style.css" />',
        '</head>',
        '<body>',
        '<h1>{pageTitle}</h1>',
        '<div id="content">{content}</div>',
        '</body>',
        '</html>'        
    ].join('\n')
    .replace(/\{title\}/g, title)
    .replace(/\{pageTitle\}/g, pageTitle)
    .replace(/\{content\}/g, content);
}