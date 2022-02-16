import avatar1 from './userImages/pexels-brent-keane-1751731.jpg';
import avatar2 from './userImages/pexels-josh-sorenson-995301.jpg';
import avatar3 from './userImages/pexels-juan-pablo-serrano-arenas-1246437.jpg';
import avatar4 from './userImages/pexels-kendall-hoopes-2261954.jpg';

export { ChannelInfoIcon } from './ChannelInfoIcon';
export { ChannelSaveIcon } from './ChannelSaveIcon';
export { CloseThreadIcon } from './CloseThreadIcon';
export { CommandIcon } from './CommandIcon';
export { CreateChannelIcon } from './CreateChannelIcon';
export { EmojiIcon } from './EmojiIcon';
export { HamburgerIcon } from './HamburgerIcon';
export { LightningBoltSmall } from './LightningBoltSmall';
export { SendIcon } from './SendIcon';
export { XButton } from './XButton';
export { XButtonBackground } from './XButtonBackground';

const randomImages = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
 
];

export const getRandomImage = () => {
  const index = Math.floor(Math.random() * 4);
  return randomImages[index];
};

export const getCleanImage = (member) => {
  let cleanImage = member.user?.image || '';

  const cleanIndex = randomImages.findIndex((image) => image.includes(cleanImage?.slice?.(1, -14)));

  if (cleanIndex === -1) {
    cleanImage = getRandomImage();
  } else {
    cleanImage = randomImages[cleanIndex];
  }

//   if (member.user?.name === 'Jen Alexander') {
//     cleanImage = randomImages[11];
//   }

//   if (member.user?.name === 'Kevin Rosen') {
//     cleanImage = randomImages[23];
//   }

  return cleanImage;
};