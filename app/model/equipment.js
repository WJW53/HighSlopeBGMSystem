module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;

  // 账户_设备编号全局唯一就行了
  const EquipmentSchema = new Schema(
    {
      equipmentNo: {
        type: String,
        required: true,
        unique: true,
      },
      equipmentName: {
        type: String,
        required: true,
        unique: true,
      },
      _user_: {
        type: ObjectId,
        ref: 'User',
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
      remark: {
        type: String,
      }
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('Equipment', EquipmentSchema);
};
