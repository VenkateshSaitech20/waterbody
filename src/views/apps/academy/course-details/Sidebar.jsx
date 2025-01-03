'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'

// Styled component for Accordion component
export const Accordion = styled(MuiAccordion)({
  margin: '0 !important',
  boxShadow: 'none !important',
  border: '1px solid var(--mui-palette-divider) !important',
  borderRadius: '0 !important',
  background: 'none',
  '&:not(:last-of-type)': {
    borderBottom: '0 !important'
  },
  '&:before': {
    display: 'none'
  },
  '&:first-of-type': {
    borderTopLeftRadius: 'var(--mui-shape-borderRadius) !important',
    borderTopRightRadius: 'var(--mui-shape-borderRadius) !important'
  },
  '&:last-of-type': {
    borderBottomLeftRadius: 'var(--mui-shape-borderRadius) !important',
    borderBottomRightRadius: 'var(--mui-shape-borderRadius) !important'
  }
})

// Styled component for AccordionSummary component
export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: theme.spacing(3, 6),
  transition: 'none',
  backgroundColor: 'var(--mui-palette-action-hover)',
  borderBlockEnd: '0 !important',
  '&.Mui-expanded': {
    '& .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(90deg)'
    },
    borderBlockEnd: '1px solid var(--mui-palette-divider) !important'
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: theme.direction === 'rtl' && 'rotate(180deg)'
  }
}))

// Styled component for AccordionDetails component
export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(4, 3)} !important`,
  backgroundColor: 'var(--mui-palette-background-paper)'
}))

const Sidebar = ({ content }) => {
  // States
  const [expanded, setExpanded] = useState(0)
  const [items, setItems] = useState(content?.map(item => item.topics) ?? [])

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleCheckboxChange = (e, index1, index2) => {
    setItems(
      items.map((item, i) => {
        if (i === index1) {
          return item.map((topic, j) => {
            if (j === index2) {
              return { ...topic, isCompleted: e.target.checked }
            }

            return topic
          })
        }

        return item
      })
    )
  }

  return (
    <>
      {content?.map((item, index) => {
        const totalTime = items[index]
          .reduce((sum, topic) => {
            const time = parseFloat(topic.time || '0')

            return sum + time
          }, 0)
          .toFixed(2)

        const selectedTopics = items[index].filter(topic => topic.isCompleted).length

        return (
          <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
            <AccordionSummary
              id='customized-panel-header-1'
              expandIcon={<i className='bx-chevron-right text-2xl text-textSecondary' />}
              aria-controls={'sd'}
            >
              <div>
                <Typography variant='h5'>{item.title}</Typography>
                <Typography className='!font-normal !text-textSecondary'>{`${selectedTopics} / ${item.topics.length} | ${parseFloat(totalTime)} min`}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <List role='list' component='div' className='flex flex-col gap-4 plb-0'>
                {item.topics.map((topic, i) => {
                  return (
                    <ListItem key={i} role='listitem' className='gap-3 p-0'>
                      <ListItemIcon>
                        <Checkbox
                          tabIndex={-1}
                          checked={items[index][i].isCompleted}
                          onChange={e => handleCheckboxChange(e, index, i)}
                        />
                      </ListItemIcon>
                      <div>
                        <Typography variant='h6'>{`${i + 1}. ${topic.title}`}</Typography>
                        <Typography variant='body2'>{topic.time}</Typography>
                      </div>
                    </ListItem>
                  )
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}

export default Sidebar
