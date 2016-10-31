"use strict";
const GitFactory = require('simple-git');
const fs = require('fs');
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
    getRepo(keyPath) {
        let path = this.availablePaths.get(keyPath);
        if (typeof path === 'undefined') {
            throw new Error('There are no such path registered in API: ' + keyPath);
        }
        if (!this.repositories.has(path)) {
            if (!fs.existsSync(path)) {
                throw new Error('Cannot locate path in filesystem: ' + path);
            }
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
