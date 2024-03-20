import React, { ReactElement } from 'react';
import { DevCardFooterProps, DevCardTextProps } from './common';
import DevCardPlaceholder from '../../DevCardPlaceholder';
import GoToDevCardButton from '../../GoToDevCardButton';
import { Modal } from '../common/Modal';

const devCardText = ({ user }: DevCardTextProps): string => {
  if (!user) {
    return `DevCard is your developer ID. It showcases your achievements to the world. Sign up to generate yours.`;
  }
  return 'DevCard is your developer ID. It showcases your achievements to the world.';
};

export default function DevCardFooter({
  user,
  isLocked,
}: DevCardFooterProps): ReactElement {
  return (
    <div className="pt-2">
      <Modal.Subtitle className="mb-2">Generate your DevCard</Modal.Subtitle>
      <div className="mt-2 flex">
        <DevCardPlaceholder profileImage={user?.image} height={80} width={60} />
        <div className="ml-6 flex flex-1 flex-col items-start">
          <Modal.Text>{devCardText({ user })}</Modal.Text>
          <GoToDevCardButton className="mt-3" isLocked={isLocked}>
            Generate
          </GoToDevCardButton>
        </div>
      </div>
    </div>
  );
}
