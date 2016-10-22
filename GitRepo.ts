import sGit = require('simple-git');

/**
 * Flyweight factory to prevent creation of sGit.Git instance
 * when to access to the same repository path.
 */
export class GitRepo {
  protected repositories: Map<string, sGit.Git>;

  constructor(protected availablePaths: Set<string>) {
    this.repositories = new Map<string, sGit.Git>();
  }

  /**
   * @return sGit.Git
   */
  public getRepo(path:string) {
    if (!this.repositories.has(path)) {
      this.repositories.set(path, sGit(path));
    }

    return this.repositories.get(path);
  }

  public isAvailable(path: string) {
    console.log(this.availablePaths);
    return this.availablePaths.has(path);
  }
}