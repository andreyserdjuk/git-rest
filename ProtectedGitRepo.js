"use strict";
const GitFactory = require('simple-git');
/**
 * Flyweight factory to prevent creation of Git instance
 * when to access to the same repository path.
 */
class ProtectedGitRepo {
    constructor(availablePaths) {
        this.availablePaths = availablePaths;
        this.repositories = new Map();
    }
    /**
     * @return Git
     */
    getRepo(path) {
        if (!this.repositories.has(path)) {
            this.repositories.set(path, GitFactory(path));
        }
        return this.repositories.get(path);
    }
    isAvailable(path) {
        return this.availablePaths.has(path);
    }
    getAvailablePaths() {
        return this.availablePaths;
    }
}
exports.ProtectedGitRepo = ProtectedGitRepo;
