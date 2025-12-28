export type CliOptions = {
  port: number;
  open: boolean;
  help: boolean;
  version: boolean;
};

export function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    port: 4545,
    open: true,
    help: false,
    version: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    switch (arg) {
      case "--help":
      case "-h":
        options.help = true;
        break;

      case "--version":
      case "-v":
        options.version = true;
        break;

      case "--port":
        const value = argv[i + 1];
        if (!value || isNaN(Number(value))) {
          throw new Error("--port requires a number");
        }
        options.port = Number(value);
        i++;
        break;

      case "--no-open":
        options.open = false;
        break;
    }
  }

  return options;
}
