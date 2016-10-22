"use strict";
const sGit = require('simple-git');
/**
 * Flyweight factory to prevent creation of sGit.Git instance
 * when to access to the same repository path.
 */
class GitRepo {
    constructor(availablePaths) {
        this.availablePaths = availablePaths;
        this.repositories = new Map();
    }
    /**
     * @return sGit.Git
     */
    getRepo(path) {
        if (!this.repositories.has(path)) {
            this.repositories.set(path, sGit(path));
        }
        return this.repositories.get(path);
    }
    isAvailable(path) {
        console.log(this.availablePaths);
        return this.availablePaths.has(path);
    }
}
exports.GitRepo = GitRepo;
