import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EmbedIcon, LinkIcon } from '../icons';
import { ListIcon, SidebarMenuItem } from './common';
import { Section, SectionCommonProps } from './Section';
import { useLazyModal } from '../../hooks/useLazyModal';
import { LazyModal } from '../modals/common/types';
import { useAuthContext } from '../../contexts/AuthContext';
import { AuthTriggers } from '../../lib/auth';

export function ContributeSection(props: SectionCommonProps): ReactElement {
  const router = useRouter();
  const { modal, openModal } = useLazyModal();
  const { isLoggedIn, showLogin } = useAuthContext();

  const openSubmitArticle = () => openModal({ type: LazyModal.SubmitArticle });

  const contributeMenuItems: SidebarMenuItem[] = [
    {
      icon: (active: boolean) => (
        <ListIcon Icon={() => <LinkIcon secondary={active} />} />
      ),
      title: 'Community picks',
      action: openSubmitArticle,
      active: modal?.type === LazyModal.SubmitArticle,
    },
    {
      icon: (active) => (
        <ListIcon Icon={() => <EmbedIcon secondary={active} />} />
      ),
      title: 'Suggest new source',
      action: () => {
        if (!isLoggedIn) {
          showLogin({ trigger: AuthTriggers.SubmitNewSource });

          return;
        }

        openModal({ type: LazyModal.NewSource });
      },
      active: modal?.type === LazyModal.NewSource,
    },
  ];

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const query = Object.fromEntries(search);
    if (!query?.scout) {
      return;
    }

    const { origin, pathname } = window.location;
    openSubmitArticle();
    router.replace(origin + pathname);
    // @NOTE see https://dailydotdev.atlassian.net/l/cp/dK9h1zoM
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section
      title="Contribute"
      items={contributeMenuItems}
      {...props}
      isItemsButton={false}
    />
  );
}
