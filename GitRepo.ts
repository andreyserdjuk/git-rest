import GitFactory = require('simple-git');
import Git = GitFactory.Git;

/**
 * Flyweight factory to prevent creation of Git instance
 * when to access to the same repository path.
 */
export class GitRepo {
  protected repositories: Map<string, Git>;

  constructor(protected availablePaths: Set<string>) {
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
    console.log(this.availablePaths);
    return this.availablePaths.has(path);
  }
}