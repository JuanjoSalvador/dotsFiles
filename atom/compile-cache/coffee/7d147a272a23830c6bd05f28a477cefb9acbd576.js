(function() {
  var CodeContext, OperatingSystem, grammarMap;

  CodeContext = require('../lib/code-context');

  OperatingSystem = require('../lib/grammar-utils/operating-system');

  grammarMap = require('../lib/grammars');

  describe('grammarMap', function() {
    beforeEach(function() {
      this.codeContext = new CodeContext('test.txt', '/tmp/test.txt', null);
      this.dummyTextSource = {};
      return this.dummyTextSource.getText = function() {
        return "";
      };
    });
    it("has a command and an args function set for each grammar's mode", function() {
      var argList, commandContext, lang, mode, modes, _results;
      this.codeContext.textSource = this.dummyTextSource;
      _results = [];
      for (lang in grammarMap) {
        modes = grammarMap[lang];
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (mode in modes) {
            commandContext = modes[mode];
            expect(commandContext.command).toBeDefined();
            argList = commandContext.args(this.codeContext);
            _results1.push(expect(argList).toBeDefined());
          }
          return _results1;
        }).call(this));
      }
      return _results;
    });
    return describe('Operating system specific runners', function() {
      beforeEach(function() {
        this._originalPlatform = OperatingSystem.platform;
        return this.reloadGrammar = function() {
          delete require.cache[require.resolve('../lib/grammars.coffee')];
          return grammarMap = require('../lib/grammars.coffee');
        };
      });
      afterEach(function() {
        OperatingSystem.platform = this._originalPlatform;
        return this.reloadGrammar();
      });
      describe('C', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['C'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['C'];
          return expect(grammar).toBe(void 0);
        });
      });
      describe('C++', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['C++'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang\+\+/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['C++'];
          return expect(grammar).toBe(void 0);
        });
      });
      describe('F#', function() {
        it('returns "fsi" as command for File Based runner on Windows', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['F#'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('fsi');
          expect(args[0]).toEqual('--exec');
          return expect(args[1]).toEqual(this.codeContext.filepath);
        });
        return it('returns "fsharpi" as command for File Based runner when platform is not Windows', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['F#'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('fsharpi');
          expect(args[0]).toEqual('--exec');
          return expect(args[1]).toEqual(this.codeContext.filepath);
        });
      });
      describe('Objective-C', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C'];
          return expect(grammar).toBe(void 0);
        });
      });
      return describe('Objective-C++', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C++'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang\+\+/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C++'];
          return expect(grammar).toBe(void 0);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvanVhbmpvLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC9zcGVjL2dyYW1tYXJzLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSx1Q0FBUixDQURsQixDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxpQkFBUixDQUZiLENBQUE7O0FBQUEsRUFJQSxRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBLEdBQUE7QUFDckIsSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxJQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLFdBQUEsQ0FBWSxVQUFaLEVBQXdCLGVBQXhCLEVBQXlDLElBQXpDLENBQW5CLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxlQUFELEdBQW1CLEVBRm5CLENBQUE7YUFHQSxJQUFDLENBQUEsZUFBZSxDQUFDLE9BQWpCLEdBQTJCLFNBQUEsR0FBQTtlQUFHLEdBQUg7TUFBQSxFQUpsQjtJQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsSUFNQSxFQUFBLENBQUcsZ0VBQUgsRUFBcUUsU0FBQSxHQUFBO0FBQ25FLFVBQUEsb0RBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxXQUFXLENBQUMsVUFBYixHQUEwQixJQUFDLENBQUEsZUFBM0IsQ0FBQTtBQUNBO1dBQUEsa0JBQUE7aUNBQUE7QUFDRTs7QUFBQTtlQUFBLGFBQUE7eUNBQUE7QUFDRSxZQUFBLE1BQUEsQ0FBTyxjQUFjLENBQUMsT0FBdEIsQ0FBOEIsQ0FBQyxXQUEvQixDQUFBLENBQUEsQ0FBQTtBQUFBLFlBQ0EsT0FBQSxHQUFVLGNBQWMsQ0FBQyxJQUFmLENBQW9C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

//# sourceURL=/home/juanjo/.atom/packages/script/spec/grammars-spec.coffee
