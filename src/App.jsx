import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AppShell from './components/layout/AppShell'
import ConsumerPicker from './components/selectors/ConsumerPicker'
import CampaignPicker from './components/selectors/CampaignPicker'
import ContextPicker from './components/selectors/ContextPicker'
import PipelineView from './components/pipeline/PipelineView'
import ScoreComparison from './components/pipeline/ScoreComparison'
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import { consumers, campaigns, contexts } from './data'
import { useScoring } from './hooks/useScoring'

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true)

  // Auto-select a compelling example on load
  const [selectedConsumer, setSelectedConsumer] = useState(consumers[0])
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0])
  const [selectedContext, setSelectedContext] = useState(contexts[0])

  const scoring = useScoring(selectedConsumer, selectedCampaign, selectedContext)

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showOnboarding ? (
        <motion.div
          key="onboarding"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <AppShell
            sidebar={
              <div className="flex flex-col h-full">
                <ConsumerPicker
                  consumers={consumers}
                  selected={selectedConsumer}
                  onSelect={setSelectedConsumer}
                />
                <CampaignPicker
                  campaigns={campaigns}
                  selected={selectedCampaign}
                  onSelect={setSelectedCampaign}
                />
                <ContextPicker
                  contexts={contexts}
                  selected={selectedContext}
                  onSelect={setSelectedContext}
                />
              </div>
            }
            selectors={[
              {
                id: 'consumer',
                selected: selectedConsumer?.name,
                content: (
                  <ConsumerPicker
                    consumers={consumers}
                    selected={selectedConsumer}
                    onSelect={setSelectedConsumer}
                  />
                ),
              },
              {
                id: 'campaign',
                selected: selectedCampaign?.name,
                content: (
                  <CampaignPicker
                    campaigns={campaigns}
                    selected={selectedCampaign}
                    onSelect={setSelectedCampaign}
                  />
                ),
              },
              {
                id: 'context',
                selected: selectedContext?.name,
                content: (
                  <ContextPicker
                    contexts={contexts}
                    selected={selectedContext}
                    onSelect={setSelectedContext}
                  />
                ),
              },
            ]}
            results={
              <ScoreComparison
                scoring={scoring}
                consumer={selectedConsumer}
                campaign={selectedCampaign}
              />
            }
          >
            <PipelineView
              consumer={selectedConsumer}
              campaign={selectedCampaign}
              context={selectedContext}
              scoring={scoring}
            />
          </AppShell>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
