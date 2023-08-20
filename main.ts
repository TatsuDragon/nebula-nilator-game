namespace SpriteKind {
    export const menu = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const HardEnemy = SpriteKind.create()
    export const HardEnemyProjectile = SpriteKind.create()
}
function spawnHardEnemy () {
    hard_enemy = sprites.create(assets.image`Harder Enemy`, SpriteKind.HardEnemy)
    hard_enemy.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    hard_enemy.setVelocity(-50, 50)
    hard_enemy.setBounceOnWall(true)
    pause(1000)
}
function SpawnBoss () {
    BossEnemy = sprites.create(assets.image`Boss enemy`, SpriteKind.Boss)
    BossEnemy.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    BossEnemy.setVelocity(-20, 20)
    BossEnemy.setBounceOnWall(true)
    pause(2000)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.HardEnemyProjectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.none, 500)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    pause(500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.HardEnemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(1000)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
})
function spawnBasicEnemy () {
    BasicEnemy = sprites.create(assets.image`DefaultEnemy`, SpriteKind.Enemy)
    BasicEnemy.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    BasicEnemy.setVelocity(-50, 0)
    pause(200)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.HardEnemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    pause(500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(100)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    pause(500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    pause(500)
})
let projectile: Sprite = null
let BasicEnemy: Sprite = null
let BossEnemy: Sprite = null
let hard_enemy: Sprite = null
let BasicEnemySpawn = 0
info.setScore(0)
music.play(music.stringPlayable("B A G A G F A C5 ", 200), music.PlaybackMode.LoopingInBackground)
game.setGameOverScoringType(game.ScoringType.HighScore)
effects.starField.startScreenEffect()
game.splash("Arrow Keys or WASD to move (z key = a button)")
game.splash("Shooting is automatic")
music.stopAllSounds()
music.play(music.stringPlayable("C5 G B A F A C5 B ", 200), music.PlaybackMode.LoopingInBackground)
info.setLife(3)
let PLayerSprite = sprites.create(assets.image`Player`, SpriteKind.Player)
controller.moveSprite(PLayerSprite)
PLayerSprite.setStayInScreen(true)
PLayerSprite.setPosition(20, 15)
BasicEnemySpawn = 1
let extra_life = true
forever(function () {
    if (BasicEnemySpawn == 1) {
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
        projectile = sprites.createProjectileFromSprite(assets.image`PlayerBullet`, PLayerSprite, 100, 0)
        pause(1000)
    }
})
forever(function () {
    if (BasicEnemySpawn == 1) {
        spawnBasicEnemy()
        spawnHardEnemy()
        SpawnBoss()
    }
})
forever(function () {
    if (info.score() > 14999) {
        if (extra_life == true) {
            info.changeLifeBy(1)
            extra_life = false
        }
    }
})
forever(function () {
    if (info.life() < 1) {
        music.stopAllSounds()
        game.gameOver(false)
        game.setGameOverScoringType(game.ScoringType.HighScore)
        game.splash(info.highScore())
    }
})
