//=============================================================================
// MMO_Core_Animax.js
//=============================================================================

/*:
 * @plugindesc MMORPG Maker MV - Core Handling Sync Animax
 * @author Orphus
 *
 * @help This plugin does not provide plugin commands.
 */

function MMO_Core_Animax() {
  this.initialize.apply(this, arguments);
}

(function () {
  const _PKD_ANIMAX_PluginCommand_AddPart = PKD_ANIMAX.PluginCommand_AddPart;
  PKD_ANIMAX.PluginCommand_AddPart = function (charaId, partId, isRelative) {
    _PKD_ANIMAX_PluginCommand_AddPart(charaId, partId, isRelative);
    // Emit to node server
    var data;
    isAdd = false;
    data = {
      actorId: $gameParty.leader().actorId(),
      mapId: $gameMap.mapId(),
      partId,
      isRelative,
      isAdd,
    };

    MMO_Core.socket.emit('animaX:changePart', data);
  };

  MMO_Core.socket.on('animaX:changePart', async (data) => {
    // console.log('animaX:changePart', data);
    let char = MMO_Core_Players.Players[data.id];
    char.addNewXAnimPart(data.partId);
  });

  const _PKD_ANIMAX_PluginCommand_RemovePart = PKD_ANIMAX.PluginCommand_RemovePart;
  PKD_ANIMAX.PluginCommand_RemovePart = function (charaId, partId) {
    _PKD_ANIMAX_PluginCommand_RemovePart(charaId, partId);
    // Emit to node server
    var data = {
      actorId: $gameParty.leader().actorId(),
      mapId: $gameMap.mapId(),
      partId,
    };
    MMO_Core.socket.emit('animaX:removePart', data);
  };

  MMO_Core.socket.on('animaX:removePart', async (data) => {
    // console.log('animaX:removePart', data);
    let char = MMO_Core_Players.Players[data.id];
    char.removeXAnimPart(data.partId);
  });

  const _PKD_ANIMAX_PluginCommand_StopAnimationAction = PKD_ANIMAX.PluginCommand_StopAnimationAction;
  PKD_ANIMAX.PluginCommand_StopAnimationAction = function (charaId) {
    _PKD_ANIMAX_PluginCommand_StopAnimationAction(charaId);
    // Emit to node server
    var data = {
      actorId: $gameParty.leader().actorId(),
      mapId: $gameMap.mapId(),
    };
    MMO_Core.socket.emit('animaX:stopAnimationAction', data);
  };

  MMO_Core.socket.on('animaX:stopAnimationAction', async (data) => {
    // console.log('animaX:removePart', data);
    let char = MMO_Core_Players.Players[data.id];
    char.resetXAnima();
  });

  const _PKD_ANIMAX_PluginCommand_PlayAnimationAction = PKD_ANIMAX.PluginCommand_PlayAnimationAction;
  PKD_ANIMAX.PluginCommand_PlayAnimationAction = function (actionName, charaId, isLoop, isWait) {
    _PKD_ANIMAX_PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
    // Emit to node server
    var data = {
      actorId: $gameParty.leader().actorId(),
      mapId: $gameMap.mapId(),
      actionName,
      isLoop,
      isWait,
    };
    MMO_Core.socket.emit('animaX:playAnimationAction', data);
  };

  MMO_Core.socket.on('animaX:playAnimationAction', async (data) => {
    // console.log('animaX:removePart', data);
    let char = MMO_Core_Players.Players[data.id];
    if (!String.any(data.actionName)) {
      char.resetXAnima();
    } else {
      if (char.startAnimaXCustomAction(actionName, isLoop, isWait)) {
        if (isWait == true && isLoop == false) {
          PKD_ANIMAX.SetInterpreterToWait(char);
        }
      }
    }
  });

  const _PKD_ANIMAX_PluginCommand_ClearParts = PKD_ANIMAX.PluginCommand_ClearParts;
  PKD_ANIMAX.PluginCommand_ClearParts = function (charaId) {
    _PKD_ANIMAX_PluginCommand_ClearParts(charaId);
    // Emit to node server
    var data = {
      actorId: $gameParty.leader().actorId(),
      mapId: $gameMap.mapId(),
    };
    MMO_Core.socket.emit('animaX:clearParts', data);
  };

  MMO_Core.socket.on('animaX:clearParts', async (data) => {
    // console.log('animaX:removePart', data);
    let char = MMO_Core_Players.Players[data.id];
    char.clearXAnimParts();
  });
})();
