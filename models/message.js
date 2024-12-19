const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Room, { foreignKey: "roomId" });
    }
  }

  Message.init(
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );

  return Message;
};
