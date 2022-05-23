module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;

  // 账户_工位编号全局唯一就行了
  const StationSchema = new Schema(
    {
      stationNo: {
        type: String,
        required: true,
        unique: true,
      },
      stationName: {
        type: String,
        required: true,
        unique: true,
      },
      _user_: {
        type: ObjectId,
        ref: 'User',
        required: true,
      },
      location: {
        type: Schema.Types.Mixed,
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
  return mongoose.model('Station', StationSchema);
};
