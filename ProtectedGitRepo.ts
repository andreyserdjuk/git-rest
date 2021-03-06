import { debug } from 'util';
import GitFactory = require('simple-git');
import Git = GitFactory.Git;
import fs =  require('fs');

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
  public getRepo(keyPath:string) {
    if (!this.isAvailable(keyPath)) {
      throw new Error(`There are no such path registered in API: "${keyPath}"`);
    }

    let path = this.availablePaths.get(keyPath);
    if (!this.repositories.has(path)) {
      this.repositories.set(path, GitFactory(path));
    }

    return this.repositories.get(path);
  }

  public isAvailable(path: string) {
    return this.availablePaths.has(path);
  }

  public getAvailablePaths(): Map<string, string> {
    return this.availablePaths;
  }
}