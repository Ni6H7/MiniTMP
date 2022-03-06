var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
function chatHook(command) {
    var terminalcmd = command.split(" ");
    if (terminalcmd[0] == "$") {
        clientMessage("$");
    }
    if (terminalcmd[0] == "$help") {
        clientMessage ("show help - Shows Data\nadditem - Gives an item\naddexp - Gives experience\nsite - opens the site in the game\n\nTerminal v1.1 github public");
    }
    if (terminalcmd[0] == "$show") {
        if (terminalcmd[1] == "help") {
            clientMessage ("Using - show (text(shown below))");
            clientMessage("Available Information to Show :\n ip , port , biome , XYZ , difficulty , time , nameuser , worldname ,\n entity , help , worldlocation ,\n hunger , score , allplayers , data ,\n entity , uuid");
        }
        if (terminalcmd[1] == "ip") {
            clientMessage("\nIP server - " + Server.getAddress());
            clientMessage ("IP user - Shown on site");
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    var webs = new android.webkit.WebView(ctx);
                    var webset = webs.getSettings();
                    webset.setJavaScriptEnabled(true);
                    webs.setWebViewClient(new android.webkit.WebViewClient());
                    webs.loadUrl('https://2ip.ru');
                    new android.app.AlertDialog.Builder(ctx).setView(webs).show();
                }}));
        }
        if (terminalcmd[1] == "port") {
            clientMessage("\nPort - " + Server.getPort());
            clientMessage("Localhost Port - 8080");
        }
        if (terminalcmd[1] == "uuid") {
            clientMessage ("\n" + Player.getName(uuid));
        }
        if (terminalcmd[1] == "biome") {
            clientMessage("\nBiome Server/Local - " + Level.getBiomeName());
            clientMessage ("Biome Server/Local ID - " + Level.getBiome());
        }
        if (terminalcmd[1] == "difficulty") {
            clientMessage("\nDifficulty Server/Local - " + Level.getDifficulty());
        }
        if (terminalcmd[1] == "time") {
            clientMessage("\nServer/Local Time - " + Level.getTime());
        }
        if (terminalcmd[1] == "worldname") {
            clientMessage("\nWorld Name - " + Level.getWorldName());
        }
        if (terminalcmd[1] == "nameuser") {
            clientMessage("\nYour Nick on the server - " + Player.getName(Player.getEntity()));
        }
        if (terminalcmd[1] == "XYZ") {
            clientMessage("\nXYZ - " + Player.getX() + " " + Player.getY() + " " + Player.getZ());
        }
        if (terminalcmd[1] == "data") {
            clientMessage("\nUnknown Data - " + Level.getData());
        }
        if (terminalcmd[1] == "worldlocation") {
            clientMessage("\nworldlocation - server/Worlds/world");
            clientMessage("sdcard/games/com.mojang/minecraftWorlds/" + Level.getWorldName());
        }
        if (terminalcmd[1] == "hunger") {
            var exhaustion = Player.getExhaustion();
            var hunger = Player.getHunger();
            var saturation = Player.getSaturation();

            exhaustion = ~~(exhaustion*1000)/1000;
            hunger = ~~(hunger*1000)/1000;
            saturation = ~~(saturation*1000)/1000;

            clientMessage("\nexhaustion: " + exhaustion + "\nHunger: " + hunger + "\nSaturation: " + saturation);
        }
        if (terminalcmd[1] == "score") {
            clientMessage("\nAn experience: " + Player.getExp() + "\nLevel: " + Player.getLevel() + "\nScore: " + Player.getScore());
        }
        if (terminalcmd[1] == "entity") {
            clientMessage ("\nEntity - " + Entity.getAll());
            clientMessage ("Players - " + Server.getAllPlayers());
        }
        if (terminalcmd[1] == "allplayers") {
            clientMessage ("\nPlayers - " + Server.getAllPlayerNames());
        }}
    if (terminalcmd[0] == "$site") {
        clientMessage("\nsite " + terminalcmd[1] + " opens...");
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                var webs = new android.webkit.WebView(ctx);
                var webset = webs.getSettings();
                webset.setJavaScriptEnabled(true);
                webs.setWebViewClient(new android.webkit.WebViewClient());
                webs.loadUrl(terminalcmd[1]);
                new android.app.AlertDialog.Builder(ctx).setView(webs).show();
            }}));
    }
    if (terminalcmd[0] == "$additem") {
        Player.addItemInventory(terminalcmd[1], terminalcmd[2], terminalcmd[3]);
        clientMessage("\nIssued Item - " + item.getName(terminalcmd[1], terminalcmd[3]) + " In quantity - " + terminalcmd[2]);
        clientMessage ("\nUsage: additem (ID) (quantity) (Type (If not, put 0)");
    }
    if (terminalcmd[0] == "$addexp") {
        Player.addExp(terminalcmd[1]);
        clientMessage("\nIssued " + terminalcmd[1] + " experience");
        clientMessage ("\nUsage: addexp (quantity)");
    }
}