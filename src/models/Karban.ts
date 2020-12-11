import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StringAndRequired = {
  type: String,
  required: true,
};
const StringAndRequiredAndUnique = {
  type: String,
  required: true,
  unique: true,
};

const KarbanSchema = new Schema({
  passcode: StringAndRequired,
  project: [
    {
      projectId: StringAndRequiredAndUnique,
      projectName: StringAndRequired,
      projectDescription: String,
      tabs: [
        {
          tabId: StringAndRequiredAndUnique,
          cards: [
            {
              cardId: StringAndRequiredAndUnique,
              cardBody: String,
            },
          ],
        },
      ],
    },
  ],
});

const Karban = mongoose.model('Karban', KarbanSchema);
