import { HiOutlineBookmark, HiBookmark } from 'react-icons/hi';
import { getDifficultyBadgeClass, truncateText } from '../utils/helpers';

const QuestionCard = ({
  question,
  index,
  onClick,
  isBookmarked = false,
  onBookmark,
  showAnswer = false,
  selectedAnswer,
  compact = false,
}) => {
  const difficultyClass = getDifficultyBadgeClass(question.difficulty);

  if (compact) {
    return (
      <div
        onClick={onClick}
        className="glass-card p-4 cursor-pointer group"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-dark-100 group-hover:text-primary-400 transition-colors truncate">
              {question.title}
            </h3>
            <p className="text-xs text-dark-400 mt-1 truncate">{question.subject}</p>
          </div>
          <span className={`badge ${difficultyClass} flex-shrink-0`}>
            {question.difficulty}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {index !== undefined && (
            <span className="w-8 h-8 rounded-lg bg-primary-500/15 text-primary-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {index + 1}
            </span>
          )}
          <div>
            <h3 className="text-base font-semibold text-dark-100">{question.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge ${difficultyClass}`}>{question.difficulty}</span>
              {question.subject && (
                <span className="badge bg-dark-700/50 text-dark-300 border border-dark-600/30">
                  {question.subject}
                </span>
              )}
            </div>
          </div>
        </div>
        {onBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(question._id);
            }}
            className="p-1.5 rounded-lg hover:bg-dark-700/50 transition-colors"
          >
            {isBookmarked ? (
              <HiBookmark className="w-5 h-5 text-primary-400" />
            ) : (
              <HiOutlineBookmark className="w-5 h-5 text-dark-400 hover:text-primary-400" />
            )}
          </button>
        )}
      </div>

      <p className="text-sm text-dark-300 leading-relaxed mb-4">
        {truncateText(question.question, 200)}
      </p>

      {/* MCQ Options */}
      {question.type === 'mcq' && question.options && (
        <div className="space-y-2 mb-4">
          {question.options.map((option, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = selectedAnswer === option;
            const isCorrect = showAnswer && option === question.correctAnswer;
            const isWrong = showAnswer && isSelected && option !== question.correctAnswer;

            return (
              <button
                key={i}
                onClick={onClick ? () => onClick(option) : undefined}
                disabled={showAnswer}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  isCorrect
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    : isWrong
                    ? 'bg-red-500/15 border-red-500/30 text-red-300'
                    : isSelected
                    ? 'bg-primary-500/15 border-primary-500/30 text-primary-300'
                    : 'bg-dark-800/30 border-dark-700/30 text-dark-300 hover:bg-dark-700/40 hover:border-dark-600/50'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-500/25 text-emerald-300'
                      : isWrong
                      ? 'bg-red-500/25 text-red-300'
                      : isSelected
                      ? 'bg-primary-500/25 text-primary-300'
                      : 'bg-dark-700/50 text-dark-400'
                  }`}
                >
                  {letter}
                </span>
                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation */}
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 rounded-xl bg-primary-500/5 border border-primary-500/15">
          <p className="text-xs font-semibold text-primary-400 mb-1">Explanation</p>
          <p className="text-sm text-dark-300 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
