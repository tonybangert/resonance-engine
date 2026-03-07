import Badge from '../../shared/Badge'

export default function DriverTagExtraction({ campaign }) {
  if (!campaign) return null

  return (
    <div className="space-y-2">
      <div className="text-xs text-text-muted">Extracted DriverTags from ad creative:</div>
      <div className="flex flex-wrap gap-1">
        {campaign.driverTags.map(tag => (
          <Badge key={tag} variant="orange" size="sm">{tag}</Badge>
        ))}
      </div>
      <div className="text-xs text-text-muted mt-2">
        Thomson signals: {campaign.thomsonSignals.join(', ')}
      </div>
    </div>
  )
}
