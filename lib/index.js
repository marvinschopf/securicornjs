
class Securicorn {
  constructor() {
    this.config = {
      contentSecurityPolicy:
        "default-src 'self'; img-src https://*; child-src 'none';"
    };
    this.config.modules = {
      contentSecurityPolicy: true
    };
  }

  addModule(name) {
    if (this.config.modules.includes(name)) {
      this.config.modules[name] = true;
    }
  }

  removeModule(name) {
    if (this.config.modules.includes(name)) {
      this.config.modules[name] = false;
    }
  }

  set(name, value) {
    if (name != "modules") {
      this.config[name] = value;
    }
  }

  middleware() {
    return (req, res, next) => {
      if (this.config.modules.contentSecurityPolicy) {
        res.set("Content-Security-Policy", this.config.contentSecurityPolicy);
      }
      next();
    };
  }
}

module.exports = {
  Securicorn
};
