import GitFactory = require('simple-git');
import Git = GitFactory.Git;

/**
 * Flyweight factory to prevent creation of Git instance
 * when to access to the same repository path.
 */
export class ProtectedGitRepo {
  protected repositories: Map<string, Git>;

  constructor(protected availablePaths: Map<string, string>) {
    this.repositories = new Map<string, Git>();
  }

  /**
   * @return Git
   */
  public getRepo(path:string) {
    if (!this.repositories.has(path)) {
      this.repositories.set(path, GitFactory(path));
    }

    return this.repositories.get(path);
  }

  public isAvailable(path: string) {
    return this.availablePaths.has(path);
  }

  public getAvailablePaths() {
    return this.availablePaths;
  }
}