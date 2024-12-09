import dynamic from 'next/dynamic'
import MasterDataSettings from '@views/pages/master-data-settings'

const Country = dynamic(() => import('@views/pages/master-data-settings/country'))
const State = dynamic(() => import('@views/pages/master-data-settings/state'))
const City = dynamic(() => import('@views/pages/master-data-settings/city'))
const District = dynamic(() => import('@views/pages/master-data-settings/district'))
const Block = dynamic(() => import('@views/pages/master-data-settings/block'))
const Taluk = dynamic(() => import('@views/pages/master-data-settings/taluk'))
const Panchayat = dynamic(() => import('@views/pages/master-data-settings/panchayat'))
const Jurisdiction = dynamic(() => import('@views/pages/master-data-settings/jurisdiction'))
const Habitation = dynamic(() => import('@views/pages/master-data-settings/habitation'))
const UrbanLocalBodies = dynamic(() => import('@views/pages/master-data-settings/urban-local-bodies'))

// Vars
const tabContentList = () => ({
    'country': <Country />,
    'state': <State />,
    'city': <District />,
    'district': <City />,
    'block': <Block />,
    'taluk': <Taluk />,
    'panchayat': <Panchayat />,
    'jurisdiction': <Jurisdiction />,
    'habitation': <Habitation />,
    'urban-local-bodies': <UrbanLocalBodies />
})

const MasterDataSettingsPage = () => {
    return <MasterDataSettings tabContentList={tabContentList()} />
}

export default MasterDataSettingsPage

