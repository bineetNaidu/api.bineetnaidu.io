import mongoose from 'mongoose';
const Schema = mongoose.Schema;
interface KarbanProjects {
  projectId: string;
  projectName: string;
  projectDescription: string;
  tabs: KarbanProjectTab[];
}
interface KarbanProjectTab {
  tabId: string;
  cards: KarbanProjectTabCard[];
}

interface KarbanProjectTabCard {
  cardId: string;
  cardBody: string;
}
//? An interface that describe the properties
//? that a Karban Document has
interface KarbanDocs extends mongoose.Document {
  username: string;
  passcode: string;
  projects: KarbanProjects[];
}
//? An interface that  desc the props
//? that a Karban model has!
interface KarbanModel extends mongoose.Model<KarbanDocs> {
  build(passcode: string, username: string): KarbanDocs;
  buildProject(
    _id: mongoose.Schema.Types.ObjectId,
    projectName: string,
    projectDescription: string
  ): Promise<KarbanDocs>;
  buildProjectTab(
    _id: mongoose.Schema.Types.ObjectId,
    projectId: string
  ): Promise<KarbanDocs>;
  buildProjectTabCard(
    _id: mongoose.Schema.Types.ObjectId,
    projectId: string,
    tabId: string,
    cardBody: string
  ): Promise<KarbanDocs>;
}

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
  username: StringAndRequiredAndUnique,
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
//? To build a new Karban
KarbanSchema.statics.build = (passcode: string, username: string) => {
  return new Karban({ username, passcode, projects: [] });
};
//? To build a new Karban Project
KarbanSchema.statics.buildProject = async (
  _id: mongoose.Schema.Types.ObjectId,
  projectName: string,
  projectDescription: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const projectId = mongoose.Types.ObjectId().toHexString();
  const data = { projectId, projectDescription, projectName, tabs: [] };
  return karban.projects.push(data);
};
//? To build a new Karban Project Tab
KarbanSchema.statics.buildProjectTab = async (
  _id: mongoose.Schema.Types.ObjectId,
  projectId: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const project = karban.projects.filter((p) => p.projectId === projectId);
  if (!project) throw new Error('Karban Project Not Found');
  const tabId = mongoose.Types.ObjectId().toHexString();
  return project[0].tabs.push({ tabId, cards: [] });
};
//? To build a new Karban Project tab Card
KarbanSchema.statics.buildProjectTabCard = async (
  _id: mongoose.Schema.Types.ObjectId,
  projectId: string,
  tabId: string,
  cardBody: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const project = karban.projects.filter((p) => p.projectId === projectId);
  if (!project) throw new Error('Karban Project Not Found');
  const tab = project[0].tabs.filter((t) => t.tabId === tabId);
  if (!tab) throw new Error('Karban Project Tab Not Found');
  const cardId = mongoose.Types.ObjectId().toHexString();
  return tab[0].cards.push({ cardBody, cardId });
};

const Karban = mongoose.model<KarbanDocs, KarbanModel>('Karban', KarbanSchema);

export default Karban;
