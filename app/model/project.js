module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;

  // 账户_项目编号全局唯一就行了
  const ProjectSchema = new Schema(
    {
      projectNo: {
        type: String,
        required: true,
        unique: true,
      },
      projectName: {
        type: String,
        required: true,
        unique: true,
      },
      projectLeader: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      _user_: {// 用户信息比较多, 所以就用关联了
        type: ObjectId,
        ref: 'User',
        required: true,
      },
      // 这样写是因为, 项目数据比较多, 经常关联查询太耗费效率,
      stationNo: {
        type: String,
        // required: true,
      },
      stationName: {
        type: String,
        required: true,
      },
      equipmentNo: {
        type: String,
        // required: true,
      },
      equipmentName: {
        type: String,
        required: true,
      },
      createTime: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
      //经度
      longitude: {
        type: String,
        required: true,
      },
      //纬度
      latitude: {
        type: String,
        required: true,
      },
      remark: {
        type: String,
      },
      // // 通过populate查出来结果会直接替换掉这个属性值的
      // _station_: {
      //   type: ObjectId,
      //   ref: 'Station',
      //   required: true,
      // },
      // _equipment_: {
      //   type: ObjectId,
      //   ref: 'Equipment',
      //   required: true,
      // },
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('Project', ProjectSchema);
};
