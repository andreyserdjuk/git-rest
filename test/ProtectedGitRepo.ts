import * as console from 'console';
import { debug } from 'util';
import GitFactory = require('simple-git');
import assert = require('assert');
import {ProtectedGitRepo} from './../ProtectedGitRepo';

describe('ProtectedGitRepo', () => {
  let availablePaths = new Map<string, string>();
  availablePaths.set('path1', 'path/to/path1');
  let repo = new ProtectedGitRepo(availablePaths);

  it('isAvailable()', () => {
    assert.ok(repo.isAvailable('path1'));
  });

  it('getAvailablePaths()', () => {
    assert.equal(1, repo.getAvailablePaths().size);
  });

  it('getRepo()', () => {
    debug;
    let git = repo.getRepo('path1');
    assert.ok(typeof git.branch === 'function');
  });
});