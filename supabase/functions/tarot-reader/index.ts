import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    const { question, spreadName, cards } = await req.json();

    // Prepare prompt
    let prompt = `당신은 지혜롭고 신비로운 타로 마스터입니다. 사용자의 질문과 뽑힌 카드들을 바탕으로 깊이 있고 영감을 주는 타로 리딩을 제공해주세요.\n\n`;
    prompt += `[사용자 질문]\n${question || '자유 리딩 (질문 없음)'}\n\n`;
    prompt += `[스프레드 종류]\n${spreadName}\n\n`;
    prompt += `[뽑힌 카드 목록]\n`;
    
    cards.forEach((card: any) => {
      prompt += `- 위치 [${card.positionName}]: ${card.cardName} (${card.isReversed ? '역방향' : '정방향'})\n`;
      prompt += `  * 기본 의미: ${card.meaning}\n`;
    });

    prompt += `\n위 내용들을 종합하여, 1) 각 카드가 가지는 의미와 연관성 분석, 2) 주요 흐름 및 조언, 3) 최종 결론 및 긍정적인 메시지를 포함하여 한 편의 이야기처럼 자연스럽고 따뜻한 어조로 리딩을 완성해 주세요. 마크다운 포맷(볼드, 글머리기호 등)을 적절히 활용하여 스마트폰에서 읽기 좋게 단락을 나누어 작성해주세요.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      throw new Error(data.error?.message || 'Failed to call Gemini API');
    }

    const reading = data.candidates?.[0]?.content?.parts?.[0]?.text || "리딩을 생성할 수 없습니다.";

    return new Response(
      JSON.stringify({ reading }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
