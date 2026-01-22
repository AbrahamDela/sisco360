const { execSync } = require('child_process');

console.log("Checking if build is necessary...");

// Get commit refs from Netlify environment variables
const currentCommit = process.env.COMMIT_REF;
const previousCommit = process.env.CACHED_COMMIT_REF;

if (!currentCommit || !previousCommit) {
    console.log("Missing commit environment variables. Proceeding with build.");
    process.exit(1); // Exit 1 to continue build
}

try {
    // Get list of changed files
    const cmd = `git diff --name-only ${previousCommit} ${currentCommit}`;
    const changedFiles = execSync(cmd).toString().trim().split('\n');

    // Filter for files that require a rebuild
    // We ignore changes in 'content/' and 'public/images/uploads/' and 'README.md'
    const importantChanges = changedFiles.filter(file => {
        // Ignore empty lines
        if (!file) return false;

        // Files/paths to ignore (updates here won't trigger a build)
        if (file.startsWith('content/')) return false;
        if (file.startsWith('public/images/uploads/')) return false;
        if (file === 'README.md') return false;
        if (file === '.gitignore') return false;

        // If we are here, the file is important (e.g., src/, package.json, other public/ files)
        return true;
    });

    if (importantChanges.length === 0) {
        console.log("Only content or media assets changed. Skipping build to save credits.");
        console.log("Changed files:", changedFiles);
        // Exit 0 causes Netlify to CANCEL the build
        process.exit(0);
    }

    console.log("Found code or configuration changes. Proceeding with build.");
    console.log("Important changes:", importantChanges);
    // Exit 1 causes Netlify to PROCEED with the build
    process.exit(1);

} catch (error) {
    console.error("Error checking git diff:", error);
    // Fail safe: proceed with build if we can't determine changes
    process.exit(1);
}
