module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return sequelize.define(
        'user',
        {
            firstName: { type: DataTypes.STRING, allowNull: false },
            lastName: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },

        }
    )
}