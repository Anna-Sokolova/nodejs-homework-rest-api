const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

class UploadAvatarService {
  constructor(folderAvatars) {
    this.folderAvatars = folderAvatars;
  }

  // обработка геометрии аватарки
  async transformAvatar(pathFile) {
    const picture = await jimp.read(pathFile);
    await picture
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(pathFile);
  }

  async saveAvatar({ file }) {
    await this.transformAvatar(file.path);
    const folderUserAvatar = path.join("public", this.folderAvatars);

    await fs.rename(file.path, path.join(folderUserAvatar, file.filename));
    return path.normalize(path.join(this.folderAvatars, file.filename));
  }
}

module.exports = UploadAvatarService;
