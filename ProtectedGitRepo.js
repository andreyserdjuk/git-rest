"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GitFactory = require("simple-git");
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
        if (!this.isAvailable(keyPath)) {
            throw new Error(`There are no such path registered in API: "${keyPath}"`);
        }
        let path = this.availablePaths.get(keyPath);
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
//# sourceMappingURL=ProtectedGitRepo.js.map