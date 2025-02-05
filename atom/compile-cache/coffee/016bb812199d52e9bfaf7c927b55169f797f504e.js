(function() {
  var child, filteredEnvironment, fs, path, pty, systemLanguage, _;

  pty = require('pty.js');

  path = require('path');

  fs = require('fs');

  _ = require('underscore');

  child = require('child_process');

  systemLanguage = (function() {
    var command, language;
    language = "en_US.UTF-8";
    if (process.platform === 'darwin') {
      try {
        command = 'plutil -convert json -o - ~/Library/Preferences/.GlobalPreferences.plist';
        language = "" + (JSON.parse(child.execSync(command).toString()).AppleLocale) + ".UTF-8";
      } catch (_error) {}
    }
    return language;
  })();

  filteredEnvironment = (function() {
    var env;
    env = _.omit(process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath');
    if (env.LANG == null) {
      env.LANG = systemLanguage;
    }
    env.TERM_PROGRAM = 'Terminal-Plus';
    return env;
  })();

  module.exports = function(pwd, shell, args, options) {
    var callback, emitTitle, ptyProcess, title;
    if (options == null) {
      options = {};
    }
    callback = this.async();
    if (/zsh|bash/.test(shell) && args.indexOf('--login') === -1) {
      args.unshift('--login');
    }
    ptyProcess = pty.fork(shell, args, {
      cwd: pwd,
      env: filteredEnvironment,
      name: 'xterm-256color'
    });
    title = shell = path.basename(shell);
    emitTitle = _.throttle(function() {
      return emit('terminal-plus:title', ptyProcess.process);
    }, 500, true);
    ptyProcess.on('data', function(data) {
      emit('terminal-plus:data', data);
      return emitTitle();
    });
    ptyProcess.on('exit', function() {
      emit('terminal-plus:exit');
      return callback();
    });
    return process.on('message', function(_arg) {
      var cols, event, rows, text, _ref;
      _ref = _arg != null ? _arg : {}, event = _ref.event, cols = _ref.cols, rows = _ref.rows, text = _ref.text;
      switch (event) {
        case 'resize':
          return ptyProcess.resize(cols, rows);
        case 'input':
          return ptyProcess.write(text);
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvanVhbmpvLy5hdG9tL3BhY2thZ2VzL3Rlcm1pbmFsLXBsdXMvbGliL3Byb2Nlc3MuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDREQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FGTCxDQUFBOztBQUFBLEVBR0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSLENBSEosQ0FBQTs7QUFBQSxFQUlBLEtBQUEsR0FBUSxPQUFBLENBQVEsZUFBUixDQUpSLENBQUE7O0FBQUEsRUFNQSxjQUFBLEdBQW9CLENBQUEsU0FBQSxHQUFBO0FBQ2xCLFFBQUEsaUJBQUE7QUFBQSxJQUFBLFFBQUEsR0FBVyxhQUFYLENBQUE7QUFDQSxJQUFBLElBQUcsT0FBTyxDQUFDLFFBQVIsS0FBb0IsUUFBdkI7QUFDRTtBQUNFLFFBQUEsT0FBQSxHQUFVLDBFQUFWLENBQUE7QUFBQSxRQUNBLFFBQUEsR0FBVyxFQUFBLEdBQUUsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxRQUFOLENBQWUsT0FBZixDQUF1QixDQUFDLFFBQXhCLENBQUEsQ0FBWCxDQUE4QyxDQUFDLFdBQWhELENBQUYsR0FBOEQsUUFEekUsQ0FERjtPQUFBLGtCQURGO0tBREE7QUFLQSxXQUFPLFFBQVAsQ0FOa0I7RUFBQSxDQUFBLENBQUgsQ0FBQSxDQU5qQixDQUFBOztBQUFBLEVBY0EsbUJBQUEsR0FBeUIsQ0FBQSxTQUFBLEdBQUE7QUFDdkIsUUFBQSxHQUFBO0FBQUEsSUFBQSxHQUFBLEdBQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFPLENBQUMs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

//# sourceURL=/home/juanjo/.atom/packages/terminal-plus/lib/process.coffee
