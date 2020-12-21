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
  tabName: string;
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
    _id: string,
    projectName: string,
    projectDescription: string
  ): Promise<KarbanDocs>;
  buildProjectTab(
    _id: string,
    projectId: string,
    tabName: string
  ): Promise<KarbanDocs>;
  buildProjectTabCard(
    _id: string,
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

const KarbanSchema = new Schema(
  {
    username: StringAndRequiredAndUnique,
    passcode: StringAndRequired,
    projects: [
      {
        _id: false,
        projectId: StringAndRequiredAndUnique,
        projectName: StringAndRequired,
        projectDescription: String,
        tabs: [
          {
            _id: false,
            tabId: StringAndRequiredAndUnique,
            tabName: StringAndRequired,
            cards: [
              {
                _id: false,
                cardId: StringAndRequiredAndUnique,
                cardBody: String,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    toJSON: {
      versionKey: false,
    },
  }
);
//? To build a new Karban
KarbanSchema.statics.build = (passcode: string, username: string) => {
  return new Karban({ username, passcode, projects: [] });
};
//? To build a new Karban Project
KarbanSchema.statics.buildProject = async (
  _id: string,
  projectName: string,
  projectDescription: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const projectId = mongoose.Types.ObjectId().toHexString();
  const data = {
    projectId,
    projectDescription: projectDescription || '',
    projectName,
    tabs: [],
  };
  karban.projects.push(data);
  return karban;
};
//? To build a new Karban Project Tab
KarbanSchema.statics.buildProjectTab = async (
  _id: string,
  projectId: string,
  tabName: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const project = karban.projects.find((p) => p.projectId === projectId);
  if (!project) throw new Error('Karban Project Not Found');
  const tabId = mongoose.Types.ObjectId().toHexString();
  project.tabs.push({ tabId, tabName, cards: [] });
  return karban;
};
//? To build a new Karban Project tab Card
KarbanSchema.statics.buildProjectTabCard = async (
  _id: string,
  projectId: string,
  tabId: string,
  cardBody: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const project = karban.projects.find((p) => p.projectId === projectId);
  if (!project) throw new Error('Karban Project Not Found');
  const tab = project.tabs.find((t) => t.tabId === tabId);
  if (!tab) throw new Error('Karban Project Tab Not Found');
  const cardId = mongoose.Types.ObjectId().toHexString();
  tab.cards.push({ cardBody: cardBody || '', cardId });
  return karban;
};

const Karban = mongoose.model<KarbanDocs, KarbanModel>('Karban', KarbanSchema);

export default Karban;
