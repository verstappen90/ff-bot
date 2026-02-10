const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ver se o bot está online"),

  new SlashCommandBuilder()
    .setName("saldo")
    .setDescription("Ver seu saldo de coins")
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log("Comandos registrados!");
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("🏓 Pong! Bot online.");
  }

  if (interaction.commandName === "saldo") {
    interaction.reply("💰 Seu saldo: 0 coins");
  }
});

client.login(TOKEN);
