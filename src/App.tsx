import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import SDK from 'blocksdk'

const sdk = new SDK(null, null, true)

function App() {
  const [imageURL, setImageURL] = useState<string>(sdk.getData('imageURL') || '')
  const [imageWidth, setImageWidth] = useState<string>(sdk.getData('imageWidth') || '')
  const [imageHeight, setImageHeight] = useState<string>(sdk.getData('imageHeight') || '')
  const [textOverlay, setTextOverlay] = useState<string>(sdk.getData('textOverlay') || '')
  const [textColor, setTextColor] = useState<string>(sdk.getData('textColor') || '#000000')
  const [textBackgroundColor, setTextBackgroundColor] = useState<string>(
    sdk.getData('textBackgroundColor') || '#ffffff'
  )

  useEffect(() => {
    sdk.setContent(`
        <div style="display:table; width:100%; max-width:${imageWidth}px; background-image:url('${imageURL}'); background-size: cover; text-align: center; color: ${textColor};">
          <div style="display:inline-block; width:0; vertical-align:middle; padding-bottom:${
            (Number(imageHeight) / Number(imageWidth)) * 100
          }%;"></div>
          <div style="display:inline-block; width:100%; background:${textBackgroundColor};">${textOverlay}</div>
        </div>
      </div>
    `)
  }, [imageURL, imageWidth, imageHeight, textOverlay, textColor, textBackgroundColor])

  const handleImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value)
    sdk.setData('imageURL', event.target.value)
  }

  const handleImageWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageWidth(event.target.value)
    sdk.setData('imageWidth', event.target.value)
  }

  const handleImageHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageHeight(event.target.value)
    sdk.setData('imageHeight', event.target.value)
  }

  const handleTextOverlay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextOverlay(event.target.value)
    sdk.setData('textOverlay', event.target.value)
  }

  const handleTextColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(event.target.value)
    sdk.setData('textColor', event.target.value)
  }

  const handleTextBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBackgroundColor(event.target.value)
    sdk.setData('textBackgroundColor', event.target.value)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <TextField
          id='outlined-basic'
          label='Image URL'
          variant='outlined'
          fullWidth
          value={imageURL}
          onChange={handleImageURL}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Image Width'
          variant='outlined'
          fullWidth
          value={imageWidth}
          onChange={handleImageWidth}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Image Height'
          variant='outlined'
          fullWidth
          value={imageHeight}
          onChange={handleImageHeight}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Text Overlay'
          variant='outlined'
          fullWidth
          value={textOverlay}
          onChange={handleTextOverlay}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Text Color'
          variant='outlined'
          type='color'
          fullWidth
          value={textColor}
          onChange={handleTextColor}
        />
        <TextField
          id='outlined-basic'
          label='Text Background Color'
          variant='outlined'
          type='color'
          fullWidth
          value={textBackgroundColor}
          onChange={handleTextBackgroundColor}
        />
      </Box>
    </>
  )
}

export default App
