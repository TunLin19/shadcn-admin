import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/toaster'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import ChatBotAi from '@/features/chatbot/chat-bot-ai'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster />
        <ChatBotAi />
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
