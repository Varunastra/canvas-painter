export async function parseCommands() {
    const text = await fetch("input.txt").then(resp => resp.text());
    const lines = text.split("\n");

    const commands = lines.map(line => {
        const args = line.split(" ");

        return { type: args[0], args: [...args.slice(1)] };
    });

    return commands;
}